import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { cn } from '@/utils'

const isExternal = (to: unknown): to is string =>
  typeof to === 'string' && /^(https?:)?\/\//.test(to)

export type LinkProps = RouterLinkProps & {
  /** Hiện icon mở tab mới cho link ngoài */
  showExternalIcon?: boolean
}

/**
 * Atom: Link thống nhất style.
 * - Link nội bộ -> react-router `<Link>` (không reload trang)
 * - Link ngoài (`http...`) -> `<a target="_blank" rel="noopener noreferrer">`
 */
export function Link({ to, className, children, showExternalIcon = true, ...rest }: LinkProps) {
  const classes = cn(
    'inline-flex items-center gap-1 text-primary no-underline hover:underline',
    className,
  )

  if (isExternal(to)) {
    // Bỏ các prop riêng của react-router trước khi truyền xuống thẻ <a>
    const {
      replace: _replace,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- `state` của react-router là any, chỉ loại bỏ
      state: _state,
      reloadDocument: _reloadDocument,
      preventScrollReset: _preventScrollReset,
      relative: _relative,
      viewTransition: _viewTransition,
      discover: _discover,
      ...anchorProps
    } = rest
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes} {...anchorProps}>
        {children}
        {showExternalIcon && <OpenInNewIcon sx={{ fontSize: 14 }} />}
      </a>
    )
  }

  return (
    <RouterLink to={to} className={classes} {...rest}>
      {children}
    </RouterLink>
  )
}
