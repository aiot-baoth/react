import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
import { LoginForm } from './LoginForm'

const meta = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  parameters: {
    docs: {
      description: {
        component:
          "Form đăng nhập dùng **React Hook Form + Zod** (`loginSchema` trong `src/schemas/auth.schema.ts`). Validate khi rời ô (`onTouched`), submit sẽ focus vào ô lỗi đầu tiên. `onSubmit` throw Error thì hiện lỗi chung.\n\n```tsx\nimport { LoginForm } from '@/components/organisms'\n\n<LoginForm onSubmit={async (values) => { await authApi.login(values) }} />\n```",
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
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EmptySubmit: Story = {
  name: 'Tương tác: submit rỗng',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /đăng nhập/i }))
    await expect(await canvas.findByText('Vui lòng nhập email')).toBeInTheDocument()
    await expect(canvas.getByText('Vui lòng nhập mật khẩu')).toBeInTheDocument()
    await expect(args.onSubmit).not.toHaveBeenCalled()
  },
}

export const ValidSubmit: Story = {
  name: 'Tương tác: submit hợp lệ',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText(/email/i), 'demo@example.com')
    await userEvent.type(canvas.getByLabelText(/mật khẩu/i), 'secret')
    await userEvent.click(canvas.getByRole('button', { name: /đăng nhập/i }))
    await waitFor(() =>
      expect(args.onSubmit).toHaveBeenCalledWith({ email: 'demo@example.com', password: 'secret' }),
    )
  },
}

export const ServerError: Story = {
  name: 'Lỗi từ server',
  args: {
    defaultValues: { email: 'fail@example.com', password: 'secret' },
    onSubmit: fn(() => Promise.reject(new Error('Sai email hoặc mật khẩu'))),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /đăng nhập/i }))
    await expect(await canvas.findByText('Sai email hoặc mật khẩu')).toBeInTheDocument()
  },
}
