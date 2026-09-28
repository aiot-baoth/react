import type { TFunction } from 'i18next'
import type { TranslationKey } from '@/types'

export type ValidationKey = Extract<TranslationKey, `validation.${string}`>
export type FieldKey = Extract<TranslationKey, `field.${string}`>

type Params = Record<string, string | number>
type Encoded = { $t: ValidationKey; params?: Params }

/**
 * Dùng trong Zod schema: lưu key i18n (+ tham số) thay vì câu chữ cố định,
 * FieldWrapper sẽ dịch lúc hiển thị -> đổi ngôn ngữ là lỗi đổi theo.
 *
 * z.string().min(8, { error: vmsg('validation.passwordMin', { min: 8 }) })
 * Tham số là key `field.*` sẽ được dịch luôn: vmsg('validation.required', { field: 'field.email' })
 */
export const vmsg = (key: ValidationKey, params?: Params) =>
  JSON.stringify({ $t: key, params } satisfies Encoded)

/** Dịch message lỗi: chuỗi do `vmsg` tạo -> câu theo ngôn ngữ hiện tại; chuỗi thường -> giữ nguyên */
export function translateError(t: TFunction, message?: string) {
  if (!message?.startsWith('{"$t"')) return message
  try {
    const { $t, params = {} } = JSON.parse(message) as Encoded
    const resolved = Object.fromEntries(
      Object.entries(params).map(([k, v]) => [
        k,
        typeof v === 'string' && v.startsWith('field.') ? t(v as FieldKey) : v,
      ]),
    )
    return t($t, resolved)
  } catch {
    return message
  }
}
