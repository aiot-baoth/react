import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { App, Upload, type UploadFile, type UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'

export type FileUploadProps = {
  /** Danh sách file (controlled) */
  value?: UploadFile[]
  onChange?: (files: UploadFile[]) => void
  /** Định dạng cho phép, vd "image/*,.pdf" */
  accept?: string
  /** Số file tối đa */
  maxCount?: number
  /** Dung lượng tối đa mỗi file (MB) */
  maxSizeMB?: number
  /** Hiện ảnh thu nhỏ trong danh sách */
  listType?: UploadProps['listType']
  disabled?: boolean
}

/** Kiểm tra file có khớp `accept` không (hỗ trợ ".pdf", "image/*", "image/png") */
function matchAccept(file: File, accept?: string) {
  if (!accept) return true
  return accept.split(',').some((rule) => {
    const r = rule.trim().toLowerCase()
    if (r.startsWith('.')) return file.name.toLowerCase().endsWith(r)
    if (r.endsWith('/*')) return file.type.startsWith(r.slice(0, -1))
    return file.type === r
  })
}

/**
 * Molecule: kéo thả / chọn file (antd Upload.Dragger).
 * Chỉ chọn & kiểm tra file ở client (không tự upload) — gửi `file.originFileObj` lên API khi submit.
 */
export function FileUpload({
  value,
  onChange,
  accept,
  maxCount = 5,
  maxSizeMB = 5,
  listType = 'picture',
  disabled,
}: FileUploadProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()

  return (
    <Upload.Dragger
      fileList={value}
      accept={accept}
      multiple={maxCount > 1}
      maxCount={maxCount}
      listType={listType}
      disabled={disabled}
      beforeUpload={(file) => {
        if (!matchAccept(file, accept)) {
          void message.error(t('upload.invalidType', { name: file.name }))
          return Upload.LIST_IGNORE
        }
        if (file.size / 1024 / 1024 > maxSizeMB) {
          void message.error(t('upload.tooLarge', { name: file.name, size: maxSizeMB }))
          return Upload.LIST_IGNORE
        }
        return false // Không tự upload
      }}
      onChange={({ fileList }) => onChange?.(fileList)}
    >
      <div className="flex flex-col items-center gap-1 py-2">
        <CloudUploadOutlinedIcon className="text-primary" sx={{ fontSize: 40 }} />
        <span className="text-sm text-text">{t('upload.dragText')}</span>
        <span className="text-xs text-text-secondary">
          {t('upload.hint', { count: maxCount, size: maxSizeMB })}
        </span>
      </div>
    </Upload.Dragger>
  )
}
