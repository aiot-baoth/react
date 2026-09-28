import { Alert, App } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { Heading, Link, Text } from '@/components/atoms'
import { LoginForm } from '@/components/organisms'
import { ROUTES } from '@/constants'
import { useLogin } from '@/hooks'

export default function LoginPage() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const login = useLogin()
  const from = (location.state as { from?: Location } | null)?.from

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Heading level={3}>{t('auth.loginTitle')}</Heading>
        <Text variant="secondary">{t('auth.loginSubtitle')}</Text>
      </div>
      <Alert
        type="info"
        showIcon
        title="Demo: nhập email bất kỳ (admin@... có role admin). fail@example.com để thử lỗi."
      />
      <LoginForm
        onSubmit={async (values) => {
          await login.mutateAsync(values)
          void message.success(t('auth.loginSuccess'))
          void navigate(from ? `${from.pathname}${from.search}` : ROUTES.HOME, { replace: true })
        }}
      />
      <Text variant="secondary" className="text-center">
        {t('auth.noAccount')} <Link to={ROUTES.REGISTER}>{t('auth.register')}</Link>
      </Text>
    </div>
  )
}
