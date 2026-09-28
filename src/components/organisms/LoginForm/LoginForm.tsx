import { Alert } from 'antd'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/atoms'
import { FormInput } from '@/components/molecules'
import { useZodForm } from '@/hooks'
import { loginSchema, type LoginFormValues } from '@/schemas'

export type LoginFormProps = {
  /** Gọi khi form hợp lệ. Throw Error để hiện lỗi chung phía trên nút submit */
  onSubmit: (values: LoginFormValues) => void | Promise<void>
  /** Giá trị khởi tạo */
  defaultValues?: Partial<LoginFormValues>
}

/** Organism: form đăng nhập — React Hook Form + Zod (`loginSchema`). */
export function LoginForm({ onSubmit, defaultValues }: LoginFormProps) {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useZodForm(loginSchema, {
    defaultValues: { email: '', password: '', ...defaultValues },
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (err) {
      setError('root', { message: err instanceof Error ? err.message : t('auth.loginFailed') })
    }
  })

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-4">
      <FormInput
        control={control}
        name="email"
        label={t('auth.email')}
        required
        placeholder="you@example.com"
      />
      <FormInput
        control={control}
        name="password"
        type="password"
        label={t('auth.password')}
        required
      />
      {errors.root && <Alert type="error" showIcon title={errors.root.message} />}
      <Button type="submit" fullWidth loading={isSubmitting}>
        {t('auth.login')}
      </Button>
    </form>
  )
}
