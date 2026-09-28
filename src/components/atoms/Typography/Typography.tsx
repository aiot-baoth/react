import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils'

const HEADING_CLASS = {
  1: 'text-3xl font-bold',
  2: 'text-2xl font-bold',
  3: 'text-xl font-semibold',
  4: 'text-lg font-semibold',
  5: 'text-base font-semibold',
  6: 'text-sm font-semibold',
} as const

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /** Cấp heading: quyết định thẻ `h1`–`h6` và cỡ chữ */
  level?: keyof typeof HEADING_CLASS
  children: ReactNode
}

/** Atom: tiêu đề `h1`–`h6` với cỡ chữ thống nhất. */
export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const
  return (
    <Tag className={cn('m-0 text-text', HEADING_CLASS[level], className)} {...rest}>
      {children}
    </Tag>
  )
}

const TEXT_CLASS = {
  body: 'text-sm text-text',
  secondary: 'text-sm text-text-secondary',
  caption: 'text-xs text-text-secondary',
  strong: 'text-sm font-semibold text-text',
  code: 'rounded bg-black/5 px-1.5 py-0.5 font-mono text-xs text-text dark:bg-white/10',
  danger: 'text-sm text-error',
  success: 'text-sm text-success',
} as const

export type TextProps = HTMLAttributes<HTMLElement> & {
  /** Kiểu chữ */
  variant?: keyof typeof TEXT_CLASS
  /** Thẻ HTML render ra */
  as?: ElementType
  /** Cắt chữ 1 dòng, thêm `...` */
  truncate?: boolean
  children: ReactNode
}

/** Atom: đoạn chữ với các biến thể màu/cỡ chữ thống nhất. */
export function Text({
  variant = 'body',
  as: Component = 'span',
  truncate,
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Component className={cn(TEXT_CLASS[variant], truncate && 'truncate', className)} {...rest}>
      {children}
    </Component>
  )
}
