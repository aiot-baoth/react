import { useId } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import { Switch, type SwitchProps } from '@/components/atoms'
import { FieldWrapper, type FieldWrapperProps } from '@/components/molecules/FieldWrapper'
import { useFieldController, type ControlledFieldProps } from '@/hooks'

type OwnProps = Omit<SwitchProps, 'checked' | 'defaultChecked' | 'onChange' | 'disabled'> &
  Pick<FieldWrapperProps, 'label' | 'hint'>

export type FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControlledFieldProps<TFieldValues, TName, TTransformedValues> & OwnProps

/** Molecule: Switch nối React Hook Form, giá trị `boolean`. */
export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: FormSwitchProps<TFieldValues, TName, TTransformedValues>) {
  const {
    field: { ref, ...field },
    fieldState,
    rest,
  } = useFieldController<TFieldValues, TName, TTransformedValues, OwnProps>(props)
  const { label, hint, className, id, ...switchProps } = rest
  const autoId = useId()

  return (
    <FieldWrapper
      label={label}
      htmlFor={id ?? autoId}
      error={fieldState.error?.message}
      hint={hint}
      className={className}
    >
      <div>
        <Switch
          {...switchProps}
          id={id ?? autoId}
          ref={ref}
          checked={Boolean(field.value)}
          onChange={(checked) => field.onChange(checked)}
          disabled={field.disabled}
        />
      </div>
    </FieldWrapper>
  )
}
