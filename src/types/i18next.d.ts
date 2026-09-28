import 'i18next'
import type { Translation } from '@/i18n/locales/vi'

// t('key') được kiểm tra type theo file vi.ts
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: Translation }
  }
}
