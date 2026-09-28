import type { ReactNode } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { Checkbox, type CheckboxProps } from '@/components/atoms'
import { FieldWrapper } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<
  CheckboxProps,
  'checked' | 'defaultChecked' | 'onChange' | 'onBlur' | 'disabled' | 'children'
> & {
  /** Nội dung cạnh ô checkbox, vd "Tôi đồng ý với điều khoản" */
  label: ReactNode
}

export type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: 1 checkbox nối React Hook Form, giá trị `boolean`. */
export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormCheckboxProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, className, ...checkboxProps } = rest

  return (
    <FieldWrapper error={fieldState.error?.message} className={className}>
      <Checkbox
        {...checkboxProps}
        ref={ref}
        name={field.name}
        checked={Boolean(field.value)}
        onChange={(e) => field.onChange(e.target.checked)}
        onBlur={field.onBlur}
        disabled={field.disabled}
      >
        {label}
      </Checkbox>
    </FieldWrapper>
  )
}
