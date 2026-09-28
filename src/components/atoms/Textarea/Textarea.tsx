import { Input, type InputRef } from 'antd'
import type { TextAreaProps as AntdTextAreaProps } from 'antd/es/input'
import type { Ref } from 'react'

export type TextareaProps = AntdTextAreaProps & {
  ref?: Ref<InputRef>
}

/** Atom: Textarea (antd). Mặc định tự giãn chiều cao 3–8 dòng. */
export function Textarea(props: TextareaProps) {
  return <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} {...props} />
}
