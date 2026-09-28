import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import IconButton from '@mui/material/IconButton'
import { Popover } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Badge, Stagger, StaggerItem } from '@/components/atoms'
import { EmptyState } from '@/components/molecules'
import type { NotificationItem } from '@/hooks'
import { cn } from '@/utils'

const DOT_COLOR = {
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
} as const

export type NotificationCenterProps = {
  items: NotificationItem[]
  onRead: (id: string) => void
  onReadAll: () => void
  /** Bấm vào 1 thông báo (vd điều hướng tới chi tiết) */
  onItemClick?: (item: NotificationItem) => void
}

/** Organism: chuông thông báo + số chưa đọc, bấm mở danh sách. */
export function NotificationCenter({
  items,
  onRead,
  onReadAll,
  onItemClick,
}: NotificationCenterProps) {
  const { t } = useTranslation()
  const unread = items.filter((n) => !n.read).length

  const content = (
    <div className="w-80">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <span className="font-semibold text-text">{t('notification.title')}</span>
        {unread > 0 && (
          <button
            type="button"
            onClick={onReadAll}
            className="border-0 bg-transparent p-0 text-xs text-primary hover:underline"
          >
            {t('notification.markAllRead')}
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <EmptyState variant="simple" title={t('notification.empty')} />
      ) : (
        <Stagger className="max-h-96 overflow-auto" role="list">
          {items.map((item) => (
            <StaggerItem key={item.id} preset="slideLeft" role="listitem">
              <button
                type="button"
                onClick={() => {
                  if (!item.read) onRead(item.id)
                  onItemClick?.(item)
                }}
                className={cn(
                  'flex w-full gap-3 border-0 bg-transparent px-1 py-3 text-left hover:bg-black/5 dark:hover:bg-white/5',
                  !item.read && 'bg-primary/5',
                )}
              >
                <span
                  className={cn(
                    'mt-1.5 size-2 shrink-0 rounded-full',
                    item.read ? 'bg-transparent' : DOT_COLOR[item.type ?? 'info'],
                  )}
                />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className={cn('text-sm text-text', !item.read && 'font-semibold')}>
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="truncate text-xs text-text-secondary">{item.description}</span>
                  )}
                  <span className="text-xs text-text-secondary">
                    {dayjs(item.createdAt).fromNow()}
                  </span>
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  )

  return (
    <Popover content={content} trigger="click" placement="bottomRight" arrow={false}>
      <IconButton aria-label={t('notification.title')}>
        <Badge count={unread} size="small">
          <NotificationsNoneOutlinedIcon className="text-text" />
        </Badge>
      </IconButton>
    </Popover>
  )
}
