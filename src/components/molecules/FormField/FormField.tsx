import { useId } from 'react'
import { Input, type InputProps } from '@/components/atoms'

export type FormFieldProps = InputProps & {
  label: string
  error?: string
  required?: boolean
}

/** Molecule: Label + Input + thông báo lỗi. */
export function FormField({ label, error, required, id, ...inputProps }: FormFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-text">
        {label}
        {required && <span className="ml-0.5 text-error">*</span>}
      </label>
      <Input id={inputId} status={error ? 'error' : undefined} {...inputProps} />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}
