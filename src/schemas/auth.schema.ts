import { emailRule, passwordRule, requiredString } from './common.schema'
import { z } from './zod'

export const loginSchema = z.object({
  email: emailRule,
  password: requiredString('mật khẩu'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: requiredString('họ tên').max(50),
    email: emailRule,
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Mật khẩu xác nhận không khớp',
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
