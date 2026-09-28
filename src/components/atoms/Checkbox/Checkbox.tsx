import {
  Checkbox as AntdCheckbox,
  type CheckboxProps as AntdCheckboxProps,
  type CheckboxRef,
} from 'antd'
import type { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/es/checkbox'
import type { Ref } from 'react'

export type CheckboxProps = AntdCheckboxProps & { ref?: Ref<CheckboxRef> }

/** Atom: Checkbox (antd). */
export function Checkbox(props: CheckboxProps) {
  return <AntdCheckbox {...props} />
}

export type CheckboxGroupProps = AntdCheckboxGroupProps

/** Atom: nhóm checkbox từ `options`. */
export function CheckboxGroup(props: CheckboxGroupProps) {
  return <AntdCheckbox.Group {...props} />
}
