import { vmsg } from '@/i18n/validation'
import { requiredString } from './common.schema'
import { z } from './zod'

export const postSchema = z.object({
  title: requiredString('field.title').max(120, {
    error: vmsg('validation.maxLength', { max: 120 }),
  }),
  body: requiredString('field.content').min(10, {
    error: vmsg('validation.minLength', { min: 10 }),
  }),
  userId: z.number({ error: vmsg('validation.select', { field: 'field.author' }) }),
})

export type PostFormValues = z.infer<typeof postSchema>
