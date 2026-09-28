import { Input as AntdInput, type InputProps as AntdInputProps, type InputRef } from 'antd'
import type { Ref } from 'react'

export type InputProps = AntdInputProps & {
  /** Ref tới antd InputRef (có `.focus()`), React Hook Form dùng để focus ô lỗi */
  ref?: Ref<InputRef>
}

/** Atom: Input dựa trên Ant Design Input. `type="password"` tự dùng Input.Password (có nút ẩn/hiện). */
export function Input({ type, ...props }: InputProps) {
  if (type === 'password') return <AntdInput.Password {...props} />
  return <AntdInput allowClear type={type} {...props} />
}
