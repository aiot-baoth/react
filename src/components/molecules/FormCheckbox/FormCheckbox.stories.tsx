import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { useZodForm } from '@/hooks'
import { vmsg } from '@/i18n/validation'
import { z } from '@/schemas'
import { FormCheckbox } from './FormCheckbox'

const schema = z.object({ agree: z.literal(true, { error: vmsg('validation.agree') }) })

function Demo() {
  const { control, handleSubmit } = useZodForm(schema)
  return (
    <form noValidate onSubmit={handleSubmit(() => {})} className="flex max-w-sm flex-col gap-4">
      <FormCheckbox control={control} name="agree" label="Tôi đồng ý với điều khoản sử dụng" />
      <Button type="submit">Tiếp tục</Button>
    </form>
  )
}

const meta = {
  title: 'Molecules/FormCheckbox',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          '1 checkbox đã nối **React Hook Form**, giá trị `boolean`. Bắt buộc tick: `z.literal(true)`.\n\n```tsx\n<FormCheckbox control={control} name="agree" label="Tôi đồng ý" />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowError: Story = {
  name: 'Tương tác: chưa tick',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Tiếp tục' }))
    await expect(await canvas.findByText('Bạn cần đồng ý điều khoản')).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('checkbox'))
    await expect(canvas.queryByText('Bạn cần đồng ý điều khoản')).not.toBeInTheDocument()
  },
}
