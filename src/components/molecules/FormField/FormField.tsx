import { useId } from 'react'
import { Input, type InputProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'

export type FormFieldProps = InputProps &
  Pick<FieldWrapperProps, 'hint'> & {
    /** Nhãn hiển thị phía trên input */
    label: string
    /** Thông báo lỗi; có giá trị thì input chuyển sang status `error` */
    error?: string
    /** Hiện dấu `*` bắt buộc */
    required?: boolean
  }

/** Molecule: Label + Input + thông báo lỗi. */
export function FormField({
  label,
  error,
  required,
  hint,
  id,
  className,
  ...inputProps
}: FormFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <Input id={inputId} status={error ? 'error' : undefined} {...inputProps} />
    </FieldWrapper>
  )
}
