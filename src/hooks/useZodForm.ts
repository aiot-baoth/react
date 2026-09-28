import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldValues, type UseFormProps } from 'react-hook-form'
import type { z } from '@/schemas'

/**
 * useForm + zodResolver, type form tự suy ra từ schema.
 * - TInput: giá trị trong form (trước khi parse) — dùng cho defaultValues
 * - TOutput: giá trị sau khi Zod parse/transform — nhận trong handleSubmit
 *
 * const form = useZodForm(loginSchema, { defaultValues: { email: '', password: '' } })
 */
export function useZodForm<TInput extends FieldValues, TOutput extends FieldValues>(
  schema: z.ZodType<TOutput, TInput>,
  options?: Omit<UseFormProps<TInput, unknown, TOutput>, 'resolver'>,
) {
  return useForm<TInput, unknown, TOutput>({
    mode: 'onTouched',
    ...options,
    resolver: zodResolver(schema),
  })
}
