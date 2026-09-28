import { Button } from '@/components/atoms'
import { FormInput } from '@/components/molecules'
import { useZodForm } from '@/hooks'
import { registerSchema, type RegisterFormValues } from '@/schemas'

export type RegisterFormProps = {
  /** Gọi khi form hợp lệ, nhận dữ liệu đã được Zod parse */
  onSubmit: (values: RegisterFormValues) => void | Promise<void>
}

/** Organism: form đăng ký — ví dụ rule phức tạp (mật khẩu mạnh, xác nhận mật khẩu). */
export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useZodForm(registerSchema, {
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput control={control} name="name" label="Họ tên" required />
      <FormInput control={control} name="email" label="Email" required />
      <FormInput
        control={control}
        name="password"
        type="password"
        label="Mật khẩu"
        required
        // Đổi mật khẩu -> validate lại ô xác nhận
        rules={{ deps: 'confirmPassword' }}
      />
      <FormInput
        control={control}
        name="confirmPassword"
        type="password"
        label="Xác nhận mật khẩu"
        required
      />
      <Button type="submit" fullWidth loading={isSubmitting}>
        Đăng ký
      </Button>
    </form>
  )
}
