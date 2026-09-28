import { useId } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { DatePicker, type DatePickerProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<
  DatePickerProps,
  'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'status' | 'disabled'
> &
  Pick<FieldWrapperProps, 'label' | 'required' | 'hint'>

export type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: DatePicker nối React Hook Form, giá trị `Dayjs | null` (schema: `dateRule`). */
export function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormDatePickerProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, required, hint, className, id, ...pickerProps } = rest
  const autoId = useId()
  const error = fieldState.error?.message

  return (
    <FieldWrapper
      label={label}
      htmlFor={id ?? autoId}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <DatePicker
        {...pickerProps}
        id={id ?? autoId}
        ref={ref}
        value={field.value ?? null}
        onChange={(date) => field.onChange(date)}
        onBlur={field.onBlur}
        disabled={field.disabled}
        status={error ? 'error' : undefined}
      />
    </FieldWrapper>
  )
}
