import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import IconButton from '@mui/material/IconButton'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Heading, Text } from '@/components/atoms'
import { Breadcrumb, type BreadcrumbItem } from '@/components/molecules'
import { cn } from '@/utils'

export type PageHeaderProps = {
  title: ReactNode
  subtitle?: ReactNode
  /** Nút hành động bên phải, vd "Tạo mới" */
  extra?: ReactNode
  /** `undefined` = tự sinh từ route, `false` = ẩn, mảng = tự truyền */
  breadcrumb?: BreadcrumbItem[] | false
  /** Có truyền thì hiện nút quay lại cạnh tiêu đề */
  onBack?: () => void
  className?: string
}

/** Organism: đầu trang gồm breadcrumb + tiêu đề + mô tả + nút hành động. */
export function PageHeader({
  title,
  subtitle,
  extra,
  breadcrumb,
  onBack,
  className,
}: PageHeaderProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('mb-4 flex flex-col gap-2', className)}>
      {breadcrumb !== false && <Breadcrumb items={breadcrumb} />}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {onBack && (
            <IconButton aria-label={t('common.back')} size="small" onClick={onBack}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          <div className="flex min-w-0 flex-col">
            <Heading level={3} className="truncate">
              {title}
            </Heading>
            {subtitle && <Text variant="secondary">{subtitle}</Text>}
          </div>
        </div>
        {extra && <div className="flex flex-wrap gap-2">{extra}</div>}
      </div>
    </div>
  )
}
