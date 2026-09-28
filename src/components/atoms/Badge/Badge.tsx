import { Badge as AntdBadge, type BadgeProps as AntdBadgeProps } from 'antd'

export type BadgeProps = AntdBadgeProps

/** Atom: Badge (antd) — số đếm hoặc chấm trên icon/avatar. Mặc định tối đa `99+`. */
export function Badge(props: BadgeProps) {
  return <AntdBadge overflowCount={99} {...props} />
}
