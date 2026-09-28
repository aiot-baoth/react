import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Card, Skeleton } from 'antd'
import type { ReactNode } from 'react'
import { AnimatedNumber } from '@/components/atoms'
import { cn } from '@/utils'

export type StatCardProps = {
  title: ReactNode
  /** Truyền `number` để có hiệu ứng số chạy */
  value: ReactNode
  /** Định dạng khi `value` là number, vd tiền tệ */
  formatValue?: (value: number) => string
  /** Icon hiển thị góc phải */
  icon?: ReactNode
  /** % thay đổi so với kỳ trước: dương = xanh ↑, âm = đỏ ↓ */
  trend?: number
  /** Chú thích cạnh trend, vd "so với tháng trước" */
  trendLabel?: ReactNode
  loading?: boolean
  className?: string
}

/** Molecule: thẻ số liệu cho dashboard. */
export function StatCard({
  title,
  value,
  formatValue,
  icon,
  trend,
  trendLabel,
  loading,
  className,
}: StatCardProps) {
  const up = (trend ?? 0) >= 0

  return (
    <Card className={cn('h-full', className)}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 1 }} />
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-text-secondary">{title}</span>
            <span className="text-2xl font-bold text-text tabular-nums">
              {typeof value === 'number' ? (
                <AnimatedNumber value={value} format={formatValue} />
              ) : (
                value
              )}
            </span>
            {trend !== undefined && (
              <span className="flex items-center gap-1 text-xs">
                <span
                  className={cn(
                    'inline-flex items-center font-semibold',
                    up ? 'text-success' : 'text-error',
                  )}
                >
                  {up ? (
                    <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                  )}
                  {Math.abs(trend)}%
                </span>
                {trendLabel && <span className="text-text-secondary">{trendLabel}</span>}
              </span>
            )}
          </div>
          {icon && (
            <div className="grid size-11 shrink-0 place-items-center rounded-app bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
