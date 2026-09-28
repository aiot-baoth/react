import { Empty } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Animate } from '@/components/atoms'
import { cn } from '@/utils'

export type EmptyStateProps = {
  /** Tiêu đề; mặc định "Không có dữ liệu" */
  title?: ReactNode
  /** Mô tả thêm */
  description?: ReactNode
  /** Nút hành động, vd "Tạo mới" */
  action?: ReactNode
  /** `simple`: hình nhỏ (dùng trong bảng, dropdown) */
  variant?: 'default' | 'simple'
  className?: string
}

/** Molecule: trạng thái rỗng khi không có dữ liệu. */
export function EmptyState({
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <Animate preset="fade">
      <Empty
        className={cn('py-6', className)}
        image={variant === 'simple' ? Empty.PRESENTED_IMAGE_SIMPLE : Empty.PRESENTED_IMAGE_DEFAULT}
        description={
          <div className="flex flex-col gap-1">
            <span className="font-medium text-text">{title ?? t('empty.title')}</span>
            {(description ?? variant === 'default') && (
              <span className="text-text-secondary">{description ?? t('empty.description')}</span>
            )}
          </div>
        }
      >
        {action}
      </Empty>
    </Animate>
  )
}
