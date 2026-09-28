import { Switch as AntdSwitch, type SwitchProps as AntdSwitchProps } from 'antd'
import type { Ref } from 'react'

export type SwitchProps = AntdSwitchProps & { ref?: Ref<HTMLButtonElement> }

/** Atom: Switch (antd) — bật/tắt. */
export function Switch(props: SwitchProps) {
  return <AntdSwitch {...props} />
}
