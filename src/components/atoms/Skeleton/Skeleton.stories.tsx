import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          "Khung chờ tải nội dung (antd), mặc định có hiệu ứng. Có thêm `Skeleton.Input`, `Skeleton.Button`, `Skeleton.Avatar`, `Skeleton.Image`.\n\n```tsx\nimport { Skeleton } from '@/components/atoms'\n\nif (isPending) return <Skeleton paragraph={{ rows: 4 }} />\n```",
      },
    },
  },
  args: { paragraph: { rows: 3 } },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithAvatar: Story = { args: { avatar: true } }

export const Elements: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton.Avatar active />
      <Skeleton.Input active />
      <Skeleton.Button active />
      <Skeleton.Image active />
    </div>
  ),
}
