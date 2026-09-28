import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { useZodForm } from '@/hooks'
import { vmsg } from '@/i18n/validation'
import { z } from '@/schemas'
import { FormNumberInput } from './FormNumberInput'

const schema = z.object({
  price: z
    .number({ error: vmsg('validation.required', { field: 'field.salary' }) })
    .min(1000, { error: vmsg('validation.minValue', { min: '1.000₫' }) }),
})

function Demo() {
  const { control, handleSubmit } = useZodForm(schema)
  return (
    <form noValidate onSubmit={handleSubmit(() => {})} className="flex max-w-xs flex-col gap-4">
      <FormNumberInput control={control} name="price" label="Mức lương" required currency />
      <Button type="submit">Lưu</Button>
    </form>
  )
}

const meta = {
  title: 'Molecules/FormNumberInput',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          'Nhập số đã nối **React Hook Form**, giá trị `number | null`. `currency` để định dạng VND.\n\n```tsx\n<FormNumberInput control={control} name="price" label="Giá" currency />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowError: Story = {
  name: 'Tương tác: để trống',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Lưu' }))
    await expect(await canvas.findByText('Vui lòng nhập mức lương')).toBeInTheDocument()
  },
}
