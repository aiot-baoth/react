import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/atoms'
import { ErrorState } from '@/components/molecules'
import { ROUTES } from '@/constants'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ErrorState
      status="404"
      title={t('error.notFoundTitle')}
      description={t('error.notFoundDescription')}
      extra={<Button onClick={() => void navigate(ROUTES.HOME)}>{t('common.backHome')}</Button>}
    />
  )
}
