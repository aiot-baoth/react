import type { FieldPath, FieldValues } from 'react-hook-form'
import { useFieldController, type ControlledFieldProps } from '@/hooks'
import { FormField, type FormFieldProps } from '@/components/molecules/FormField'

type OwnProps = Omit<
  FormFieldProps,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'error' | 'disabled' | 'ref'
>

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/**
 * Molecule: FormField đã nối với React Hook Form.
 * Tự lấy value/onChange/onBlur/ref và thông báo lỗi (Zod) từ form.
 *
 * ```tsx
 * <FormInput control={form.control} name="email" label="Email" />
 * ```
 */
export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormInputProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, value, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)

  return (
    <FormField
      {...rest}
      ref={ref}
      name={field.name}
      value={value ?? ''}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={field.disabled}
      error={fieldState.error?.message}
    />
  )
}
