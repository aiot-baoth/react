import { App } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export type ConfirmOptions = {
  title?: ReactNode
  content?: ReactNode
  danger?: boolean
  confirmText?: ReactNode
  cancelText?: ReactNode
  /** Chạy khi bấm xác nhận; trả Promise thì nút hiện loading, lỗi thì hộp thoại không đóng */
  onConfirm?: () => void | Promise<void>
}

/**
 * Hook mở hộp thoại xác nhận dạng hàm, trả về Promise<boolean>.
 *
 * const confirm = useConfirm()
 * if (await confirm({ danger: true, content: 'Xoá bài viết?' })) { ... }
 */
export function useConfirm() {
  const { modal } = App.useApp()
  const { t } = useTranslation()

  return (options: ConfirmOptions = {}) =>
    new Promise<boolean>((resolve) => {
      modal.confirm({
        title: options.title ?? t('confirm.title'),
        content: options.content,
        okText: options.confirmText ?? t('common.confirm'),
        cancelText: options.cancelText ?? t('common.cancel'),
        okButtonProps: { danger: options.danger },
        onOk: async () => {
          await options.onConfirm?.()
          resolve(true)
        },
        onCancel: () => resolve(false),
      })
    })
}

/** Rút gọn cho thao tác xoá: tiêu đề + nội dung mặc định, nút đỏ */
export function useConfirmDelete() {
  const confirm = useConfirm()
  const { t } = useTranslation()
  return (options: Omit<ConfirmOptions, 'danger'> = {}) =>
    confirm({
      title: t('confirm.deleteTitle'),
      content: t('confirm.deleteContent'),
      confirmText: t('common.delete'),
      ...options,
      danger: true,
    })
}
