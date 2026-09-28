import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { useZodForm } from '@/hooks'
import { vmsg } from '@/i18n/validation'
import { z } from '@/schemas'
import { FormRadioGroup } from './FormRadioGroup'

const schema = z.object({
  gender: z.enum(['male', 'female', 'other'], {
    error: vmsg('validation.select', { field: 'field.gender' }),
  }),
})

function Demo() {
  const { control, handleSubmit } = useZodForm(schema)
  return (
    <form noValidate onSubmit={handleSubmit(() => {})} className="flex max-w-sm flex-col gap-4">
      <FormRadioGroup
        control={control}
        name="gender"
        label="Giới tính"
        required
        options={[
          { value: 'male', label: 'Nam' },
          { value: 'female', label: 'Nữ' },
          { value: 'other', label: 'Khác' },
        ]}
      />
      <Button type="submit">Lưu</Button>
    </form>
  )
}

const meta = {
  title: 'Molecules/FormRadioGroup',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          'Nhóm radio đã nối **React Hook Form**. Hợp với `z.enum([...])`.\n\n```tsx\n<FormRadioGroup control={control} name="gender" label="Giới tính" options={options} />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowError: Story = {
  name: 'Tương tác: chưa chọn',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Lưu' }))
    await expect(await canvas.findByText('Vui lòng chọn giới tính')).toBeInTheDocument()
  },
}
