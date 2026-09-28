import type { SvgIconComponent } from '@mui/icons-material'
import type { SvgIconProps } from '@mui/material/SvgIcon'

const SIZE = { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 } as const

export type IconProps = Omit<SvgIconProps, 'fontSize' | 'color'> & {
  /** Component icon từ `@mui/icons-material`, vd `AddIcon` */
  icon: SvgIconComponent
  /** Kích thước chuẩn */
  size?: keyof typeof SIZE
  /** Màu theo theme; mặc định kế thừa màu chữ */
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'disabled'
    | 'action'
}

/** Atom: hiển thị icon MUI với size/color thống nhất. */
export function Icon({
  icon: IconComponent,
  size = 'md',
  color = 'inherit',
  sx,
  ...rest
}: IconProps) {
  return <IconComponent color={color} sx={{ fontSize: SIZE[size], ...sx }} {...rest} />
}
