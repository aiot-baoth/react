import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip (antd) — chú thích khi hover. Bọc quanh phần tử cần giải thích (nhất là nút chỉ có icon).\n\n```tsx\nimport { Tooltip } from \'@/components/atoms\'\n\n<Tooltip title="Xoá"><IconButton>...</IconButton></Tooltip>\n```',
      },
    },
  },
  args: { title: 'Nội dung tooltip', children: <Button variant="outlined">Hover vào đây</Button> },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'topLeft', 'bottomRight'],
    },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AlwaysOpen: Story = {
  args: { open: true, placement: 'right' },
}
