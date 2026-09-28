import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export type ButtonProps = MuiButtonProps & {
  /** Hiển thị spinner và disable button */
  loading?: boolean
}

/** Atom: Button dựa trên MUI Button. */
export function Button({ loading = false, disabled, startIcon, children, ...rest }: ButtonProps) {
  return (
    <MuiButton
      disableElevation
      variant="contained"
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...rest}
    >
      {children}
    </MuiButton>
  )
}
