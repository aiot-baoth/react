import type { Meta, StoryObj } from '@storybook/react-vite'
import { Topbar } from './Topbar'

const meta = {
  title: 'Organisms/Topbar',
  component: Topbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Thanh trên của trang quản trị: nút thu gọn sidebar, thông báo, ngôn ngữ, theme, menu người dùng (lấy user từ Redux). Dùng trong `DashboardLayout`.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Topbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
