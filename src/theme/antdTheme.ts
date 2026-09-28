import type { ThemeConfig } from 'antd'
import { tokens } from './tokens'

export const antdTheme: ThemeConfig = {
  cssVar: { key: 'app' },
  token: {
    colorPrimary: tokens.color.primary,
    colorSuccess: tokens.color.success,
    colorWarning: tokens.color.warning,
    colorError: tokens.color.error,
    colorInfo: tokens.color.info,
    colorText: tokens.color.text,
    colorTextSecondary: tokens.color.textSecondary,
    colorBgLayout: tokens.color.background,
    colorBgContainer: tokens.color.surface,
    colorBorder: tokens.color.border,
    fontFamily: tokens.font.family,
    fontSize: tokens.font.size,
    borderRadius: tokens.radius,
  },
}
