import { useId } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { NumberInput, type NumberInputProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<
  NumberInputProps,
  'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'status' | 'disabled'
> &
  Pick<FieldWrapperProps, 'label' | 'required' | 'hint'>

export type FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: nhập số nối React Hook Form, giá trị `number | null`. */
export function FormNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormNumberInputProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, required, hint, className, id, ...numberProps } = rest
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
      <NumberInput
        {...numberProps}
        id={id ?? autoId}
        ref={ref}
        value={field.value ?? null}
        onChange={(v) => field.onChange(v)}
        onBlur={field.onBlur}
        disabled={field.disabled}
        status={error ? 'error' : undefined}
      />
    </FieldWrapper>
  )
}
