import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, screen, userEvent, within } from 'storybook/test'
import { useNotifications } from '@/hooks'
import { NotificationCenter } from './NotificationCenter'

const meta = {
  title: 'Organisms/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    docs: {
      description: {
        component:
          'Chuông thông báo + số chưa đọc, bấm mở danh sách (thời gian tương đối theo ngôn ngữ). Dữ liệu từ props — ví dụ đang dùng `useNotifications()` (mock), thay bằng TanStack Query khi có API.\n\n```tsx\nconst { items, markRead, markAllRead } = useNotifications()\n<NotificationCenter items={items} onRead={markRead} onReadAll={markAllRead} />\n```',
      },
    },
  },
  args: { items: [], onRead: fn(), onReadAll: fn() },
  decorators: [
    (Story) => (
      <div className="flex h-[440px] justify-end">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationCenter>

export default meta
type Story = StoryObj<typeof meta>

export const WithData: Story = {
  render: function Render() {
    const { items, markRead, markAllRead } = useNotifications()
    return <NotificationCenter items={items} onRead={markRead} onReadAll={markAllRead} />
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Thông báo' }))
    await userEvent.click(await screen.findByText('Đánh dấu tất cả đã đọc'))
    await expect(screen.queryByText('Đánh dấu tất cả đã đọc')).not.toBeInTheDocument()
  },
}

export const Empty: Story = {}
