import { Avatar as AntdAvatar, type AvatarProps as AntdAvatarProps } from 'antd'
import { getInitials, hashString } from '@/utils'

const COLORS = ['#1677ff', '#722ed1', '#13c2c2', '#52c41a', '#fa8c16', '#eb2f96', '#2f54eb']

/** Màu nền cố định theo tên (cùng tên luôn cùng màu) */
const colorFromName = (name: string) => COLORS[hashString(name) % COLORS.length]

export type AvatarProps = Omit<AntdAvatarProps, 'children'> & {
  /** Tên người dùng: dùng để sinh chữ viết tắt + màu nền khi không có ảnh */
  name?: string
}

/** Atom: Avatar (antd). Không có `src` thì hiện chữ viết tắt của `name`. */
export function Avatar({ name = '', src, style, ...rest }: AvatarProps) {
  return (
    <AntdAvatar
      src={src}
      alt={name}
      style={src ? style : { backgroundColor: colorFromName(name), ...style }}
      {...rest}
    >
      {getInitials(name)}
    </AntdAvatar>
  )
}
