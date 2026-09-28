import type { ParseKeys } from 'i18next'
import type { Params } from 'react-router-dom'

/** Key i18n (được kiểm tra type theo src/i18n/locales/vi.ts) */
export type TranslationKey = ParseKeys

/**
 * Metadata gắn vào route qua `handle`:
 * { path: 'posts', handle: { crumb: 'menu.posts' } satisfies RouteHandle }
 */
export type RouteHandle = {
  /** Nhãn breadcrumb: key i18n hoặc hàm nhận params, vd (p) => `#${p.id}` */
  crumb?: TranslationKey | ((params: Params) => string)
}
