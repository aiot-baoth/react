import { z } from './zod'

/** Rule dùng lại nhiều nơi — ghép vào schema bằng z.object({ email: emailRule, ... }) */
export const requiredString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { error: `Vui lòng nhập ${label}` })

export const emailRule = requiredString('email').pipe(z.email({ error: 'Email không hợp lệ' }))

export const passwordRule = z
  .string()
  .min(8, { error: 'Mật khẩu tối thiểu 8 ký tự' })
  .regex(/[A-Z]/, { error: 'Mật khẩu cần ít nhất 1 chữ hoa' })
  .regex(/\d/, { error: 'Mật khẩu cần ít nhất 1 chữ số' })

export const phoneRule = z
  .string()
  .trim()
  .regex(/^(0|\+84)\d{9}$/, { error: 'Số điện thoại không hợp lệ' })
