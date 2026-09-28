import { Result, type ResultProps } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Animate, Button } from '@/components/atoms'
import { ApiError } from '@/services/api'

type ResultStatus = NonNullable<ResultProps['status']>

/** HTTP status -> hình minh hoạ của antd Result */
function toResultStatus(error: unknown): ResultStatus {
  const status = error instanceof ApiError ? error.status : undefined
  if (status === 403) return '403'
  if (status === 404) return '404'
  if (status && status >= 500) return '500'
  return 'error'
}

export type ErrorStateProps = {
  /** Lỗi bắt được (ApiError, Error...) — tự chọn hình + thông báo phù hợp */
  error?: unknown
  title?: ReactNode
  description?: ReactNode
  /** Ép kiểu hiển thị, bỏ qua tự suy từ `error` */
  status?: ResultStatus
  /** Có truyền thì hiện nút "Thử lại" */
  onRetry?: () => void
  /** Nút hành động thêm */
  extra?: ReactNode
  className?: string
}

/** Molecule: hiển thị lỗi (API lỗi, không có quyền...) kèm nút thử lại. */
export function ErrorState({
  error,
  title,
  description,
  status,
  onRetry,
  extra,
  className,
}: ErrorStateProps) {
  const { t } = useTranslation()
  const resultStatus = status ?? toResultStatus(error)

  const defaultTitle = {
    '403': t('error.forbiddenTitle'),
    '404': t('error.notFoundTitle'),
    '500': t('error.serverTitle'),
  }[resultStatus as string]

  const errorMessage =
    error instanceof ApiError && !error.status
      ? t('error.network')
      : error instanceof Error
        ? error.message
        : undefined

  return (
    <Animate preset="scale">
      <Result
        className={className}
        status={resultStatus}
        title={title ?? defaultTitle ?? t('error.title')}
        subTitle={description ?? errorMessage ?? t('error.description')}
        extra={
          (onRetry || extra) && (
            <div className="flex justify-center gap-2">
              {onRetry && <Button onClick={onRetry}>{t('common.retry')}</Button>}
              {extra}
            </div>
          )
        }
      />
    </Animate>
  )
}
