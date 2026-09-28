import { Modal } from 'antd'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export type ConfirmDialogProps = {
  open: boolean
  /** Tiêu đề; mặc định "Xác nhận" */
  title?: ReactNode
  /** Nội dung câu hỏi */
  content?: ReactNode
  /** Nút xác nhận màu đỏ (xoá, huỷ đơn...) */
  danger?: boolean
  confirmText?: ReactNode
  cancelText?: ReactNode
  /** Có thể trả Promise: nút xác nhận tự hiện loading tới khi xong */
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

/**
 * Molecule: hộp thoại xác nhận (controlled).
 * Muốn gọi dạng hàm (không cần state `open`) thì dùng hook `useConfirm()`.
 */
export function ConfirmDialog({
  open,
  title,
  content,
  danger,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      title={title ?? t('confirm.title')}
      okText={confirmText ?? t('common.confirm')}
      cancelText={cancelText ?? t('common.cancel')}
      okButtonProps={{ danger, loading }}
      onOk={handleOk}
      onCancel={onCancel}
      mask={{ closable: !loading }}
      destroyOnHidden
    >
      {content}
    </Modal>
  )
}
