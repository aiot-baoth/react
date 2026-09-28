import { DatePicker as AntdDatePicker, type DatePickerProps as AntdDatePickerProps } from 'antd'
import type { RangePickerProps as AntdRangePickerProps } from 'antd/es/date-picker'

export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm'

export type DatePickerProps = AntdDatePickerProps

/** Atom: DatePicker (antd, dayjs). Mặc định định dạng `DD/MM/YYYY`, chiếm hết chiều ngang. */
export function DatePicker({ showTime, className, ...props }: DatePickerProps) {
  return (
    <AntdDatePicker
      format={showTime ? DATE_TIME_FORMAT : DATE_FORMAT}
      showTime={showTime}
      className={className ?? 'w-full'}
      {...props}
    />
  )
}

export type RangePickerProps = AntdRangePickerProps

/** Atom: chọn khoảng ngày. Giá trị là `[Dayjs, Dayjs]`. */
export function RangePicker({ showTime, className, ...props }: RangePickerProps) {
  return (
    <AntdDatePicker.RangePicker
      format={showTime ? DATE_TIME_FORMAT : DATE_FORMAT}
      showTime={showTime}
      className={className ?? 'w-full'}
      {...props}
    />
  )
}
