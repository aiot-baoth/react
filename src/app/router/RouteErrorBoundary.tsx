import { useTranslation } from 'react-i18next'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { Button } from '@/components/atoms'
import { ErrorState } from '@/components/molecules'
import { ROUTES } from '@/constants'

/** `errorElement` của router: lỗi khi render/lazy load route -> trang lỗi thay vì trắng màn hình. */
export function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (import.meta.env.DEV) console.error('[RouteError]', error)

  const status = isRouteErrorResponse(error) && error.status === 404 ? '404' : '500'

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <ErrorState
        status={status}
        error={error}
        onRetry={() => window.location.reload()}
        extra={
          <Button variant="outlined" onClick={() => void navigate(ROUTES.HOME)}>
            {t('common.backHome')}
          </Button>
        }
      />
    </div>
  )
}
