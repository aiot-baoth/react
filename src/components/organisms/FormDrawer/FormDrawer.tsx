import { Drawer } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms'

export type FormDrawerProps = {
  open: boolean
  title: ReactNode
  /** `id` của thẻ <form> bên trong — nút Lưu submit form này qua thuộc tính `form` */
  formId: string
  submitting?: boolean
  submitText?: ReactNode
  onClose: () => void
  width?: number
  children: ReactNode
}

/** Organism: drawer bên phải chứa form — hợp với form dài (nhiều field). */
export function FormDrawer({
  open,
  title,
  formId,
  submitting,
  submitText,
  onClose,
  width = 520,
  children,
}: FormDrawerProps) {
  const { t } = useTranslation()

  return (
    <Drawer
      open={open}
      title={title}
      size={width}
      onClose={onClose}
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
      {children}
    </Drawer>
  )
}
