import { Radio, type RadioGroupProps as AntdRadioGroupProps } from 'antd'

export type RadioGroupProps = AntdRadioGroupProps

/** Atom: nhóm radio (antd) từ `options`. `optionType="button"` để hiện dạng nút. */
export function RadioGroup(props: RadioGroupProps) {
  return <Radio.Group {...props} />
}
