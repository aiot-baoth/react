import { Input as AntdInput, type InputProps as AntdInputProps } from 'antd'

export type InputProps = AntdInputProps

/** Atom: Input dựa trên Ant Design Input. */
export function Input(props: InputProps) {
  return <AntdInput allowClear {...props} />
}
