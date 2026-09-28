import type { FieldPath, FieldValues } from 'react-hook-form'
import { RadioGroup, type RadioGroupProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<RadioGroupProps, 'value' | 'defaultValue' | 'onChange' | 'disabled' | 'name'> &
  Pick<FieldWrapperProps, 'label' | 'required' | 'hint'>

export type FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: nhóm radio nối React Hook Form. */
export function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormRadioGroupProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref: _ref, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, required, hint, className, ...radioProps } = rest

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={fieldState.error?.message}
      hint={hint}
      className={className}
    >
      <RadioGroup
        {...radioProps}
        name={field.name}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        disabled={field.disabled}
      />
    </FieldWrapper>
  )
}
