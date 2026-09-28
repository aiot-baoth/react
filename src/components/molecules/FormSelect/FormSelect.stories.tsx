import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { useZodForm } from '@/hooks'
import { vmsg } from '@/i18n/validation'
import { z } from '@/schemas'
import { FormSelect } from './FormSelect'

const schema = z.object({
  city: z.string({ error: vmsg('validation.select', { field: 'field.role' }) }),
  tags: z.array(z.string()).min(1, { error: vmsg('validation.minItems', { min: 1 }) }),
})

function Demo() {
  const { control, handleSubmit } = useZodForm(schema, { defaultValues: { tags: [] } })
  return (
    <form noValidate onSubmit={handleSubmit(() => {})} className="flex max-w-sm flex-col gap-4">
      <FormSelect
        control={control}
        name="city"
        label="Vai trò"
        required
        placeholder="Chọn vai trò"
        options={[
          { value: 'admin', label: 'Quản trị' },
          { value: 'editor', label: 'Biên tập' },
        ]}
      />
      <FormSelect
        control={control}
        name="tags"
        label="Thẻ (chọn nhiều)"
        required
        mode="multiple"
        options={['React', 'Vue', 'Svelte'].map((v) => ({ value: v, label: v }))}
      />
      <Button type="submit">Lưu</Button>
    </form>
  )
}

const meta = {
  title: 'Molecules/FormSelect',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          '`Select` (antd) đã nối **React Hook Form**. `mode="multiple"` -> giá trị là mảng. Nhận mọi props của `Select` + `label`, `required`, `hint`.\n\n```tsx\n<FormSelect control={control} name="role" label="Vai trò" required options={options} />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowErrors: Story = {
  name: 'Tương tác: submit rỗng',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Lưu' }))
    await expect(await canvas.findByText('Vui lòng chọn vai trò')).toBeInTheDocument()
    await expect(canvas.getByText('Chọn ít nhất 1 mục')).toBeInTheDocument()
  },
}
