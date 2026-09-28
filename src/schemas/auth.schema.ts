import { vmsg } from '@/i18n/validation'
import { emailRule, passwordRule, requiredString } from './common.schema'
import { z } from './zod'

export const loginSchema = z.object({
  email: emailRule,
  password: requiredString('field.password'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: requiredString('field.name').max(50, {
      error: vmsg('validation.maxLength', { max: 50 }),
    }),
    email: emailRule,
    password: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: vmsg('validation.passwordMismatch'),
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
