import { InputNumber, type InputNumberProps } from 'antd'
import type { ComponentRef, Ref } from 'react'

/** 1234567 -> "1.234.567" */
const formatThousands = (value: string | number | undefined) =>
  `${value ?? ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const parseThousands = (value: string | undefined) => Number((value ?? '').replace(/\./g, ''))

export type NumberInputProps = Omit<InputNumberProps<number>, 'formatter' | 'parser'> & {
  /** Hiện phân tách hàng nghìn bằng dấu chấm (1.000.000) */
  thousandSeparator?: boolean
  /** Hiện hậu tố `₫` và bật phân tách hàng nghìn */
  currency?: boolean
  ref?: Ref<ComponentRef<typeof InputNumber>>
}

/** Atom: nhập số (antd InputNumber), hỗ trợ định dạng tiền VND. */
export function NumberInput({
  thousandSeparator,
  currency,
  className,
  ...props
}: NumberInputProps) {
  const format = thousandSeparator || currency
  return (
    <InputNumber<number>
      className={className ?? 'w-full'}
      formatter={format ? formatThousands : undefined}
      parser={format ? parseThousands : undefined}
      suffix={currency ? '₫' : undefined}
      min={currency ? 0 : undefined}
      {...props}
    />
  )
}
