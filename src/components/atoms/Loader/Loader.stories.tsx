import type { Meta, StoryObj } from '@storybook/react-vite'
import { Loader } from './Loader'

const meta = {
  title: 'Atoms/Loader',
  component: Loader,
  parameters: {
    docs: {
      description: {
        component:
          "Loader dựa trên **Ant Design Spin**, căn giữa sẵn. Dùng cho trạng thái chờ tải dữ liệu / lazy route.\n\n```tsx\nimport { Loader } from '@/components/atoms'\n\nif (isLoading) return <Loader />\n```",
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['small', 'default', 'large'],
      description: 'Kích thước',
      table: { defaultValue: { summary: 'default' } },
    },
    description: { control: 'text', description: 'Dòng mô tả dưới spinner' },
    fullScreen: { control: 'boolean' },
    className: { control: 'text', description: 'Class Tailwind bổ sung cho wrapper' },
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex">
      <Loader size="small" />
      <Loader size="default" />
      <Loader size="large" />
    </div>
  ),
}
