import { StyleProvider } from '@ant-design/cssinjs'
import { ThemeProvider } from '@mui/material/styles'
import { App as AntdApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import viVN from 'antd/locale/vi_VN'
import { useEffect, useMemo, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { selectThemeMode, useAppSelector } from '@/store'
import { createAntdTheme, createMuiTheme } from '@/theme'

/**
 * Đọc theme mode (Redux) + ngôn ngữ (i18next) rồi cấp cho MUI, antd và Tailwind.
 * - Tailwind: set `<html data-theme="dark">` -> biến CSS + variant `dark:` đổi theo
 */
export function ThemeBridge({ children }: PropsWithChildren) {
  const mode = useAppSelector(selectThemeMode)
  const { i18n } = useTranslation()

  const muiTheme = useMemo(() => createMuiTheme(mode), [mode])
  const antdTheme = useMemo(() => createAntdTheme(mode), [mode])
  const antdLocale = i18n.language.startsWith('en') ? enUS : viVN

  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, [mode])

  return (
    <ThemeProvider theme={muiTheme}>
      <StyleProvider layer>
        <ConfigProvider theme={antdTheme} locale={antdLocale}>
          <AntdApp>{children}</AntdApp>
        </ConfigProvider>
      </StyleProvider>
    </ThemeProvider>
  )
}
