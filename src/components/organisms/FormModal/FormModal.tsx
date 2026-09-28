import { Modal } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms'

export type FormModalProps = {
  open: boolean
  title: ReactNode
  /** `id` của thẻ <form> bên trong — nút Lưu submit form này qua thuộc tính `form` */
  formId: string
  /** Đang lưu: nút Lưu loading, không cho đóng */
  submitting?: boolean
  submitText?: ReactNode
  onClose: () => void
  width?: number
  children: ReactNode
}

/**
 * Organism: modal chứa form tạo / sửa.
 *
 * ```tsx
 * <FormModal open formId="post-form" title="Tạo bài viết" onClose={close}>
 *   <PostForm id="post-form" onSubmit={save} />
 * </FormModal>
 * ```
 */
export function FormModal({
  open,
  title,
  formId,
  submitting,
  submitText,
  onClose,
  width = 560,
  children,
}: FormModalProps) {
  const { t } = useTranslation()

  return (
    <Modal
      open={open}
      title={title}
      width={width}
      onCancel={onClose}
      mask={{ closable: !submitting }}
      closable={!submitting}
      destroyOnHidden
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outlined" onClick={onClose} disabled={submitting}>
            {t('common.cancel')}
          </Button>
          <Button type="submit" form={formId} loading={submitting}>
            {submitText ?? t('common.save')}
          </Button>
        </div>
      }
    >
      <div className="pt-2">{children}</div>
    </Modal>
  )
}
