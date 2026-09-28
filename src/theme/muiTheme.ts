import { createTheme } from '@mui/material/styles'
import { tokens } from './tokens'

export const muiTheme = createTheme({
  palette: {
    primary: { main: tokens.color.primary },
    secondary: { main: tokens.color.secondary },
    success: { main: tokens.color.success },
    warning: { main: tokens.color.warning },
    error: { main: tokens.color.error },
    info: { main: tokens.color.info },
    text: { primary: tokens.color.text, secondary: tokens.color.textSecondary },
    background: { default: tokens.color.background, paper: tokens.color.surface },
    divider: tokens.color.border,
  },
  typography: {
    fontFamily: tokens.font.family,
    fontSize: tokens.font.size,
    button: { textTransform: 'none' },
  },
  shape: { borderRadius: tokens.radius },
})
