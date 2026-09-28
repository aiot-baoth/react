import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/atoms'
import { ErrorState } from '@/components/molecules'
import { ROUTES } from '@/constants'

export default function ForbiddenPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ErrorState
      status="403"
      title={t('error.forbiddenTitle')}
      description={t('error.forbiddenDescription')}
      extra={<Button onClick={() => void navigate(ROUTES.HOME)}>{t('common.backHome')}</Button>}
    />
  )
}
