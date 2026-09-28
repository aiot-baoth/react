import { theme, type ThemeConfig } from 'antd'
import { tokens, type ThemeMode } from './tokens'

export function createAntdTheme(mode: ThemeMode): ThemeConfig {
  const c = tokens.mode[mode]
  return {
    cssVar: { key: 'app' },
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: tokens.color.primary,
      colorSuccess: tokens.color.success,
      colorWarning: tokens.color.warning,
      colorError: tokens.color.error,
      colorInfo: tokens.color.info,
      colorText: c.text,
      colorTextSecondary: c.textSecondary,
      colorBgLayout: c.background,
      colorBgContainer: c.surface,
      colorBgElevated: c.surface,
      colorBorder: c.border,
      fontFamily: tokens.font.family,
      fontSize: tokens.font.size,
      borderRadius: tokens.radius,
    },
  }
}

/** Theme light mặc định (giữ để tương thích) */
export const antdTheme = createAntdTheme('light')
