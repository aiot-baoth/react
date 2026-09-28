import { useTranslation } from 'react-i18next'
import { FormInput, FormSelect, FormTextarea } from '@/components/molecules'
import { USER_IDS } from '@/constants'
import { useZodForm } from '@/hooks'
import { postSchema, type PostFormValues } from '@/schemas'

export type PostFormProps = {
  /** `id` của <form> — để nút Lưu trong FormModal/FormDrawer submit được */
  id: string
  defaultValues?: Partial<PostFormValues>
  onSubmit: (values: PostFormValues) => void | Promise<void>
}

/** Organism: form tạo / sửa bài viết (không có nút — nút nằm ở FormModal/FormDrawer). */
export function PostForm({ id, defaultValues, onSubmit }: PostFormProps) {
  const { t } = useTranslation()
  const { control, handleSubmit } = useZodForm(postSchema, {
    defaultValues: { title: '', body: '', ...defaultValues },
  })

  return (
    <form id={id} noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput control={control} name="title" label={t('post.fieldTitle')} required />
      <FormSelect
        control={control}
        name="userId"
        label={t('post.fieldUser')}
        required
        options={USER_IDS.map((uid) => ({
          value: uid,
          label: t('post.userOption', { id: uid }),
        }))}
      />
      <FormTextarea
        control={control}
        name="body"
        label={t('post.fieldBody')}
        required
        showCount
        maxLength={1000}
      />
    </form>
  )
}
