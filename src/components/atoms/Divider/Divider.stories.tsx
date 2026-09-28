import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component:
          'Đường phân cách (antd), có thể kèm chữ. `type="vertical"` để phân cách theo chiều ngang.\n\n```tsx\nimport { Divider } from \'@/components/atoms\'\n\n<Divider>Hoặc</Divider>\n```',
      },
    },
  },
  args: { children: 'Hoặc' },
  argTypes: { titlePlacement: { control: 'inline-radio', options: ['start', 'center', 'end'] } },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Plain: Story = { args: { children: undefined } }

export const Vertical: Story = {
  render: () => (
    <span>
      Sửa
      <Divider orientation="vertical" />
      Xoá
      <Divider orientation="vertical" />
      Chi tiết
    </span>
  ),
}
