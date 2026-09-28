import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusTag } from './StatusTag'

const meta = {
  title: 'Atoms/StatusTag',
  component: StatusTag,
  parameters: {
    docs: {
      description: {
        component:
          'Tag (antd) hiển thị trạng thái với bộ màu cố định: `success`, `processing`, `warning`, `error`, `default`.\n\n```tsx\nimport { StatusTag } from \'@/components/atoms\'\n\n<StatusTag status="success">Hoạt động</StatusTag>\n```',
      },
    },
  },
  args: { status: 'success', children: 'Hoạt động' },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['success', 'processing', 'warning', 'error', 'default'],
    },
  },
} satisfies Meta<typeof StatusTag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllStatus: Story = {
  render: () => (
    <div className="flex gap-2">
      <StatusTag status="success">Hoạt động</StatusTag>
      <StatusTag status="processing">Đang xử lý</StatusTag>
      <StatusTag status="warning">Chờ duyệt</StatusTag>
      <StatusTag status="error">Đã huỷ</StatusTag>
      <StatusTag>Nháp</StatusTag>
    </div>
  ),
}
