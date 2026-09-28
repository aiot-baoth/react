import { Tag, type TagProps } from 'antd'
import type { ReactNode } from 'react'

const STATUS_COLOR = {
  success: 'success',
  processing: 'processing',
  warning: 'warning',
  error: 'error',
  default: 'default',
} as const

export type Status = keyof typeof STATUS_COLOR

export type StatusTagProps = Omit<TagProps, 'color'> & {
  /** Trạng thái -> màu tương ứng */
  status?: Status
  children: ReactNode
}

/** Atom: Tag (antd) hiển thị trạng thái với bộ màu cố định. */
export function StatusTag({
  status = 'default',
  variant = 'filled',
  children,
  ...rest
}: StatusTagProps) {
  return (
    <Tag color={STATUS_COLOR[status]} variant={variant} {...rest}>
      {children}
    </Tag>
  )
}
