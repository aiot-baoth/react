import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'
import { FormField, type FormFieldProps } from '@/components/molecules/FormField'

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = UseControllerProps<TFieldValues, TName, TTransformedValues> &
  Omit<
    FormFieldProps,
    'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'error' | 'disabled' | 'ref'
  >

/**
 * Molecule: FormField đã nối với React Hook Form.
 * Tự lấy value/onChange/onBlur/ref và thông báo lỗi (Zod) từ form.
 *
 * <FormInput control={form.control} name="email" label="Email" />
 */
export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  disabled,
  ...fieldProps
}: FormInputProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, value, ...field },
    fieldState,
  } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
  })

  return (
    <FormField
      {...fieldProps}
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
