import { vmsg } from '@/i18n/validation'
import { dateRule, emailRule, phoneRule, requiredString } from './common.schema'
import { z } from './zod'

/** Schema demo cho form "kitchen sink" ở trang Components — minh hoạ đủ loại field. */
export const profileDemoSchema = z.object({
  name: requiredString('field.name'),
  email: emailRule,
  phone: phoneRule.or(z.literal('')),
  role: z.string({ error: vmsg('validation.select', { field: 'field.role' }) }),
  skills: z.array(z.string()).min(1, { error: vmsg('validation.minItems', { min: 1 }) }),
  birthday: dateRule('field.birthday'),
  salary: z
    .number({ error: vmsg('validation.required', { field: 'field.salary' }) })
    .min(1_000_000, { error: vmsg('validation.minValue', { min: '1.000.000₫' }) }),
  gender: z.enum(['male', 'female', 'other'], {
    error: vmsg('validation.select', { field: 'field.gender' }),
  }),
  bio: z.string().max(200, { error: vmsg('validation.maxLength', { max: 200 }) }),
  newsletter: z.boolean(),
  agree: z.literal(true, { error: vmsg('validation.agree') }),
})

export type ProfileDemoValues = z.infer<typeof profileDemoSchema>
