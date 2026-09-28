import { createTheme } from '@mui/material/styles'
import { tokens, type ThemeMode } from './tokens'

export function createMuiTheme(mode: ThemeMode) {
  const c = tokens.mode[mode]
  return createTheme({
    palette: {
      mode,
      primary: { main: tokens.color.primary },
      secondary: { main: tokens.color.secondary },
      success: { main: tokens.color.success },
      warning: { main: tokens.color.warning },
      error: { main: tokens.color.error },
      info: { main: tokens.color.info },
      text: { primary: c.text, secondary: c.textSecondary },
      background: { default: c.background, paper: c.surface },
      divider: c.border,
    },
    typography: {
      fontFamily: tokens.font.family,
      fontSize: tokens.font.size,
      button: { textTransform: 'none' },
    },
    shape: { borderRadius: tokens.radius },
  })
}

/** Theme light mặc định (giữ để tương thích) */
export const muiTheme = createMuiTheme('light')
