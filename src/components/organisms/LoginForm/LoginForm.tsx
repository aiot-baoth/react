import { Alert } from 'antd'
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
      setError('root', { message: err instanceof Error ? err.message : 'Đăng nhập thất bại' })
    }
  })

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-4">
      <FormInput
        control={control}
        name="email"
        label="Email"
        required
        placeholder="you@example.com"
      />
      <FormInput control={control} name="password" type="password" label="Mật khẩu" required />
      {errors.root && <Alert type="error" showIcon title={errors.root.message} />}
      <Button type="submit" fullWidth loading={isSubmitting}>
        Đăng nhập
      </Button>
    </form>
  )
}
