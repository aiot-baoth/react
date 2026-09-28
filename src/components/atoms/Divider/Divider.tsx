import { Divider as AntdDivider, type DividerProps as AntdDividerProps } from 'antd'

export type DividerProps = AntdDividerProps

/** Atom: đường phân cách (antd). Có thể kèm chữ ở giữa. */
export function Divider(props: DividerProps) {
  return <AntdDivider {...props} />
}
