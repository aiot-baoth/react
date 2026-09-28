import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en as zodEn, vi as zodVi } from 'zod/locales'
import { STORAGE_KEYS } from '@/constants'
import { z } from '@/schemas/zod'
import { en } from './locales/en'
import { vi } from './locales/vi'

// "3 phút trước" / "3 minutes ago"
dayjs.extend(relativeTime)

export const LANGUAGES = ['vi', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

export const resources = {
  vi: { translation: vi },
  en: { translation: en },
} as const

/** Đồng bộ ngôn ngữ cho dayjs (DatePicker), Zod (thông báo lỗi mặc định) và thẻ <html lang>. */
function syncLanguage(lng: string) {
  const lang: Language = lng.startsWith('en') ? 'en' : 'vi'
  dayjs.locale(lang)
  z.config(lang === 'en' ? zodEn() : zodVi())
  document.documentElement.lang = lang
}

i18n.on('languageChanged', syncLanguage)

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    supportedLngs: LANGUAGES,
    interpolation: { escapeValue: false }, // React đã escape
    detection: {
      // Chỉ nhớ lựa chọn của người dùng, mặc định luôn là tiếng Việt
      order: ['localStorage'],
      lookupLocalStorage: STORAGE_KEYS.LANGUAGE,
      caches: ['localStorage'],
    },
  })

export default i18n
