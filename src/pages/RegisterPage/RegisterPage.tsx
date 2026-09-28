import { App } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Heading, Link, Text } from '@/components/atoms'
import { RegisterForm } from '@/components/organisms'
import { ROUTES } from '@/constants'
import { useRegister } from '@/hooks'

export default function RegisterPage() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const register = useRegister()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Heading level={3}>{t('auth.registerTitle')}</Heading>
        <Text variant="secondary">{t('auth.registerSubtitle')}</Text>
      </div>
      <RegisterForm
        onSubmit={async ({ name, email, password }) => {
          await register.mutateAsync({ name, email, password })
          void message.success(t('auth.registerSuccess'))
          void navigate(ROUTES.HOME, { replace: true })
        }}
      />
      <Text variant="secondary" className="text-center">
        {t('auth.hasAccount')} <Link to={ROUTES.LOGIN}>{t('auth.login')}</Link>
      </Text>
    </div>
  )
}
