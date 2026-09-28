import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { useZodForm } from '@/hooks'
import { dateRule, z } from '@/schemas'
import { FormDatePicker } from './FormDatePicker'

const schema = z.object({ birthday: dateRule('field.birthday') })

function Demo() {
  const { control, handleSubmit } = useZodForm(schema)
  return (
    <form noValidate onSubmit={handleSubmit(() => {})} className="flex max-w-sm flex-col gap-4">
      <FormDatePicker control={control} name="birthday" label="Ngày sinh" required />
      <Button type="submit">Lưu</Button>
    </form>
  )
}

const meta = {
  title: 'Molecules/FormDatePicker',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          'DatePicker đã nối **React Hook Form**, giá trị `Dayjs | null`. Schema dùng `dateRule(\'field.xxx\')`.\n\n```tsx\nconst schema = z.object({ birthday: dateRule(\'field.birthday\') })\n\n<FormDatePicker control={control} name="birthday" label="Ngày sinh" required />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowError: Story = {
  name: 'Tương tác: chưa chọn ngày',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Lưu' }))
    await expect(await canvas.findByText('Vui lòng chọn ngày sinh')).toBeInTheDocument()
  },
}
