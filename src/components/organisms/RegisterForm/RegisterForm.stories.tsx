import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { RegisterForm } from './RegisterForm'

const meta = {
  title: 'Organisms/RegisterForm',
  component: RegisterForm,
  parameters: {
    docs: {
      description: {
        component:
          "Form đăng ký — ví dụ rule phức tạp của Zod (`registerSchema`): mật khẩu mạnh (`passwordRule`), so khớp 2 ô mật khẩu bằng `.refine()`. Ô mật khẩu có `rules={{ deps: 'confirmPassword' }}` để ô xác nhận được validate lại khi mật khẩu đổi.",
      },
    },
  },
  args: { onSubmit: fn() },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PasswordMismatch: Story = {
  name: 'Tương tác: mật khẩu không khớp',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText(/họ tên/i), 'Nguyễn Văn A')
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@example.com')
    await userEvent.type(canvas.getByLabelText(/^mật khẩu/i), 'weak')
    await userEvent.type(canvas.getByLabelText(/xác nhận/i), 'khac')
    await userEvent.click(canvas.getByRole('button', { name: /đăng ký/i }))
    await expect(await canvas.findByText('Mật khẩu tối thiểu 8 ký tự')).toBeInTheDocument()
    await expect(canvas.getByText('Mật khẩu xác nhận không khớp')).toBeInTheDocument()
    await expect(args.onSubmit).not.toHaveBeenCalled()
  },
}
