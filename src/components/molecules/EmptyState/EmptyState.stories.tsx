import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/atoms'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          'Trạng thái rỗng khi không có dữ liệu. `variant="simple"` hình nhỏ cho bảng/dropdown. `DataTable` đã dùng sẵn.\n\n```tsx\nif (!items.length) return <EmptyState action={<Button onClick={create}>Tạo mới</Button>} />\n```',
      },
    },
  },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'simple'] } },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    title: 'Chưa có bài viết nào',
    description: 'Hãy tạo bài viết đầu tiên của bạn.',
    action: <Button>Tạo bài viết</Button>,
  },
}

export const Simple: Story = { args: { variant: 'simple' } }
