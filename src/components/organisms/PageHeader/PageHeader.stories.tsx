import AddIcon from '@mui/icons-material/Add'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from '@/components/atoms'
import { PageHeader } from './PageHeader'

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Đầu trang: breadcrumb + tiêu đề + mô tả + nút hành động. Breadcrumb mặc định tự sinh từ route (`handle.crumb`), `breadcrumb={false}` để ẩn.\n\n```tsx\n<PageHeader title="Bài viết" subtitle="Quản lý bài viết" extra={<Button>Tạo mới</Button>} />\n```',
      },
    },
  },
  args: {
    title: 'Danh sách bài viết',
    subtitle: 'Quản lý toàn bộ bài viết trong hệ thống',
    breadcrumb: [{ title: 'Tổng quan', to: '/' }, { title: 'Bài viết' }],
    extra: <Button startIcon={<AddIcon />}>Tạo mới</Button>,
  },
  argTypes: { extra: { control: false } },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithBack: Story = {
  args: { title: 'Chi tiết bài viết #1', subtitle: undefined, onBack: fn(), extra: undefined },
}
