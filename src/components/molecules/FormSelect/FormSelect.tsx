import { useId } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { Select, type SelectProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<
  SelectProps,
  'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'status' | 'disabled'
> &
  Pick<FieldWrapperProps, 'label' | 'required' | 'hint'>

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: Select (antd) nối React Hook Form. `mode="multiple"` -> giá trị là mảng. */
export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormSelectProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, required, hint, className, id, ...selectProps } = rest
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
      <Select
        {...selectProps}
        id={id ?? autoId}
        ref={ref}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        status={error ? 'error' : undefined}
      />
    </FieldWrapper>
  )
}
