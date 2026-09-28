import { Select as AntdSelect, type SelectProps as AntdSelectProps } from 'antd'
import type { RefSelectProps } from 'antd/es/select'
import type { Ref } from 'react'

export type SelectOption = { label: string; value: string | number; disabled?: boolean }

export type SelectProps = AntdSelectProps & { ref?: Ref<RefSelectProps> }

/**
 * Atom: Select (antd). Mặc định có tìm kiếm theo `label`, nút xoá, chiếm hết chiều ngang.
 * `mode="multiple"` để chọn nhiều.
 */
export function Select({ className, ...props }: SelectProps) {
  return (
    <AntdSelect
      showSearch={{ optionFilterProp: 'label' }}
      allowClear
      className={className ?? 'w-full'}
      {...props}
    />
  )
}
