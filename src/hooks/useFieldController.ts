import {
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form'

/** Props chung cho mọi field đã nối React Hook Form (FormInput, FormSelect...) */
export type ControlledFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = UseControllerProps<TFieldValues, TName, TTransformedValues>

/**
 * Tách props của `useController` ra khỏi props còn lại của component,
 * trả về `field`, `fieldState` và `rest` (props truyền xuống UI).
 */
export function useFieldController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TTransformedValues,
  TRest extends object,
>(props: ControlledFieldProps<TFieldValues, TName, TTransformedValues> & TRest) {
  const { control, name, rules, defaultValue, shouldUnregister, disabled, ...rest } = props
  const { field, fieldState } = useController({
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
  })
  return { field, fieldState, rest: rest as unknown as TRest }
}
