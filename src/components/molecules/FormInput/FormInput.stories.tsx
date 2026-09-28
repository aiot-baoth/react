import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { useZodForm } from '@/hooks'
import { emailRule, z } from '@/schemas'
import { FormInput } from './FormInput'

const schema = z.object({ email: emailRule })

/** Wrapper tạo form để FormInput có `control`. */
function Demo({ label, placeholder }: { label: string; placeholder?: string }) {
  const { control } = useZodForm(schema, { defaultValues: { email: '' } })
  return (
    <FormInput control={control} name="email" label={label} placeholder={placeholder} required />
  )
}

const meta = {
  title: 'Molecules/FormInput',
  component: Demo,
  parameters: {
    docs: {
      description: {
        component:
          '`FormField` đã nối với **React Hook Form** qua `useController`: tự lấy `value/onChange/onBlur/ref` và hiện lỗi từ **Zod**. Nhận thêm mọi props của `FormField` (label, placeholder, type...) và của `useController` (`rules`, `disabled`...).\n\n```tsx\nconst { control } = useZodForm(schema, { defaultValues: { email: \'\' } })\n\n<FormInput control={control} name="email" label="Email" required />\n```',
      },
    },
  },
  args: { label: 'Email', placeholder: 'you@example.com' },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const ShowError: Story = {
  name: 'Tương tác: nhập sai -> báo lỗi',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(/email/i)
    await userEvent.type(input, 'abc')
    await userEvent.tab()
    await expect(await canvas.findByText('Email không hợp lệ')).toBeInTheDocument()
  },
}
