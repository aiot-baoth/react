import dayjs, { type Dayjs } from 'dayjs'
import { vmsg, type FieldKey } from '@/i18n/validation'
import { z } from './zod'

/**
 * Rule dùng lại nhiều nơi — ghép vào schema bằng z.object({ email: emailRule, ... })
 * Message dùng `vmsg(key)` để tự dịch theo ngôn ngữ (xem src/i18n/validation.ts).
 */
export const requiredString = (field: FieldKey) =>
  z
    .string()
    .trim()
    .min(1, { error: vmsg('validation.required', { field }) })

export const emailRule = requiredString('field.email').pipe(
  z.email({ error: vmsg('validation.email') }),
)

export const passwordRule = z
  .string()
  .min(8, { error: vmsg('validation.passwordMin', { min: 8 }) })
  .regex(/[A-Z]/, { error: vmsg('validation.passwordUpper') })
  .regex(/\d/, { error: vmsg('validation.passwordDigit') })

export const phoneRule = z
  .string()
  .trim()
  .regex(/^(0|\+84)\d{9}$/, { error: vmsg('validation.phone') })

/** Giá trị của DatePicker (Dayjs). Dùng `.nullable()` nếu không bắt buộc */
export const dateRule = (field: FieldKey = 'field.date') =>
  z.custom<Dayjs>((value) => dayjs.isDayjs(value) && value.isValid(), {
    error: vmsg('validation.select', { field }),
  })
