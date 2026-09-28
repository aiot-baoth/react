import { Tooltip as AntdTooltip, type TooltipProps as AntdTooltipProps } from 'antd'

export type TooltipProps = AntdTooltipProps

/** Atom: Tooltip (antd). Bọc quanh phần tử cần hiện chú thích khi hover. */
export function Tooltip(props: TooltipProps) {
  return <AntdTooltip mouseEnterDelay={0.2} {...props} />
}
