import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '@/components/atoms'
import { useZodForm } from '@/hooks'
import { vmsg } from '@/i18n/validation'
import { requiredString, z } from '@/schemas'
import { FormTextarea } from './FormTextarea'

const schema = z.object({
  content: requiredString('field.content').min(10, {
    error: vmsg('validation.minLength', { min: 10 }),
  }),
})

function Demo() {
  const { control, handleSubmit } = useZodForm(schema, { defaultValues: { content: '' } })
  return (
    <form noValidate onSubmit={handleSubmit(() => {})} className="flex max-w-md flex-col gap-4">
      <FormTextarea
        control={control}
        name="content"
        label="Nội dung"
        required
        showCount
        maxLength={300}
      />
      <Button type="submit">Lưu</Button>
    </form>
  )
}

const meta = {
  title: 'Molecules/FormTextarea',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          'Textarea đã nối **React Hook Form**.\n\n```tsx\n<FormTextarea control={control} name="content" label="Nội dung" showCount maxLength={300} />\n```',
      },
    },
  },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ShowError: Story = {
  name: 'Tương tác: quá ngắn',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText(/nội dung/i), 'ngắn')
    await userEvent.click(canvas.getByRole('button', { name: 'Lưu' }))
    await expect(await canvas.findByText('Tối thiểu 10 ký tự')).toBeInTheDocument()
  },
}
