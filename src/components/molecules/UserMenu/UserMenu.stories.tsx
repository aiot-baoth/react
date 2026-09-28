import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, screen, userEvent, within } from 'storybook/test'
import { UserMenu } from './UserMenu'

const meta = {
  title: 'Molecules/UserMenu',
  component: UserMenu,
  parameters: {
    docs: {
      description: {
        component:
          "Avatar + tên, bấm mở menu Hồ sơ / Cài đặt / Đăng xuất. Mục nào không truyền callback thì ẩn.\n\n```tsx\n<UserMenu user={user} onProfile={() => navigate('/profile')} onLogout={handleLogout} />\n```",
      },
    },
  },
  args: {
    user: { name: 'Nguyễn Văn An', email: 'an@example.com' },
    onProfile: fn(),
    onSettings: fn(),
    onLogout: fn(),
  },
  decorators: [
    (Story) => (
      <div className="flex h-60 justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Compact: Story = { args: { compact: true } }

export const Logout: Story = {
  name: 'Tương tác: đăng xuất',
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Nguyễn Văn An' }))
    await userEvent.click(await screen.findByText('Đăng xuất'))
    await expect(args.onLogout).toHaveBeenCalled()
  },
}
