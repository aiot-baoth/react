import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, Descriptions } from 'antd'
import { fn } from 'storybook/test'
import { Button } from '@/components/atoms'
import { ApiError } from '@/services/api'
import { DetailPageTemplate } from './DetailPageTemplate'

const meta = {
  title: 'Templates/DetailPageTemplate',
  component: DetailPageTemplate,
  parameters: {
    docs: {
      description: {
        component:
          'Màn chi tiết: **PageHeader + tab nội dung + cột phụ**, có sẵn trạng thái loading / lỗi. Ví dụ đầy đủ: `src/pages/PostDetailPage`.',
      },
    },
  },
  args: {
    header: {
      title: 'Nguyễn Văn An',
      breadcrumb: [{ title: 'Người dùng', to: '/users' }, { title: '#1' }],
      onBack: fn(),
      extra: <Button>Sửa</Button>,
    },
    tabs: [
      {
        key: 'info',
        label: 'Thông tin',
        children: (
          <Descriptions
            column={1}
            bordered
            items={[
              { key: 'email', label: 'Email', children: 'an@example.com' },
              { key: 'phone', label: 'Điện thoại', children: '0901 234 567' },
            ]}
          />
        ),
      },
      { key: 'history', label: 'Lịch sử', children: 'Chưa có hoạt động.' },
    ],
    aside: (
      <Card size="small" title="Tóm tắt">
        Thành viên từ 2024
      </Card>
    ),
    onRetry: fn(),
  },
  argTypes: { header: { control: false }, tabs: { control: false }, aside: { control: false } },
} satisfies Meta<typeof DetailPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
export const Error: Story = { args: { error: new ApiError('Not found', 404) } }
