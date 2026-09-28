import TranslateIcon from '@mui/icons-material/Translate'
import { Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, type Language } from '@/i18n'

export type LanguageSwitcherProps = {
  /** Ẩn tên ngôn ngữ, chỉ hiện icon */
  compact?: boolean
}

/** Molecule: chọn ngôn ngữ (i18next), lựa chọn được lưu trong localStorage. */
export function LanguageSwitcher({ compact }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? 'vi') as Language

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        selectable: true,
        selectedKeys: [current],
        items: LANGUAGES.map((lng) => ({ key: lng, label: t(`language.${lng}`) })),
        onClick: ({ key }) => void i18n.changeLanguage(key),
      }}
    >
      <button
        type="button"
        aria-label={t('language.label')}
        className="flex items-center gap-1 rounded-app border-0 bg-transparent px-2 py-1.5 text-sm text-text hover:bg-black/5 dark:hover:bg-white/10"
      >
        <TranslateIcon sx={{ fontSize: 18 }} />
        {!compact && <span className="uppercase">{current}</span>}
      </button>
    </Dropdown>
  )
}
