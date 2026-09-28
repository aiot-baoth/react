import { useId } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { Textarea, type TextareaProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<
  TextareaProps,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'status' | 'disabled' | 'ref'
> &
  Pick<FieldWrapperProps, 'label' | 'required' | 'hint'>

export type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: Textarea nối React Hook Form. */
export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormTextareaProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, value, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, required, hint, className, id, ...textareaProps } = rest
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
      <Textarea
        {...textareaProps}
        id={id ?? autoId}
        ref={ref}
        name={field.name}
        value={value ?? ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        status={error ? 'error' : undefined}
      />
    </FieldWrapper>
  )
}
