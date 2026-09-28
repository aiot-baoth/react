import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { NumberInput } from './NumberInput'

const meta = {
  title: 'Atoms/NumberInput',
  component: NumberInput,
  parameters: {
    docs: {
      description: {
        component:
          "Nhập số (antd InputNumber). `thousandSeparator` hiện 1.000.000, `currency` thêm hậu tố ₫. Giá trị luôn là `number`. Dùng trong form: xem `FormNumberInput`.\n\n```tsx\nimport { NumberInput } from '@/components/atoms'\n\n<NumberInput currency value={price} onChange={setPrice} />\n```",
      },
    },
  },
  args: { onChange: fn() },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Currency: Story = {
  args: { currency: true, defaultValue: 1500000 },
}

export const MinMaxStep: Story = {
  args: { min: 0, max: 100, step: 5, defaultValue: 50, suffix: '%' },
}
