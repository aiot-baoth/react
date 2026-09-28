import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, waitFor, within } from 'storybook/test'
import { Button } from '../Button'
import { AnimatedNumber } from './AnimatedNumber'

const vnd = (v: number) => `${v.toLocaleString('vi-VN')}₫`

const meta = {
  title: 'Atoms/AnimatedNumber',
  component: AnimatedNumber,
  parameters: {
    docs: {
      description: {
        component:
          "Số chạy từ giá trị cũ tới giá trị mới (lần đầu từ 0). Cập nhật thẳng DOM, không re-render mỗi frame. `StatCard` tự dùng khi `value` là number.\n\n```tsx\nimport { AnimatedNumber } from '@/components/atoms'\n\n<AnimatedNumber value={revenue} format={(v) => `${v.toLocaleString('vi-VN')}₫`} />\n<AnimatedNumber value={4.56} decimals={2} />\n```",
      },
    },
  },
  args: { value: 128500000, duration: 0.8, decimals: 0 },
  argTypes: {
    duration: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    format: { control: false },
  },
  render: (args) => (
    <span className="text-3xl font-bold text-text tabular-nums">
      <AnimatedNumber {...args} />
    </span>
  ),
} satisfies Meta<typeof AnimatedNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Currency: Story = { args: { format: vnd } }

export const Decimals: Story = { args: { value: 98.76, decimals: 2 } }

export const ChangeValue: Story = {
  name: 'Đổi giá trị',
  args: { value: 1000 },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-text tabular-nums" data-testid="number">
          <AnimatedNumber {...args} value={value} />
        </span>
        <Button size="small" variant="outlined" onClick={() => setValue((v) => v + 2500)}>
          +2.500
        </Button>
      </div>
    )
  },
}

export const FinalValue: Story = {
  name: 'Tương tác: hiển thị đúng giá trị cuối',
  args: { value: 128500000, format: vnd },
  // Play test không phụ thuộc tốc độ animation (CI / tab nền có thể chạy rất chậm)
  parameters: { motion: { skip: true } },
  render: (args) => (
    <span data-testid="number" className="text-3xl font-bold text-text tabular-nums">
      <AnimatedNumber {...args} />
    </span>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(() => expect(canvas.getByTestId('number')).toHaveTextContent('128.500.000₫'))
  },
}
