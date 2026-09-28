import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Select } from './Select'

const OPTIONS = [
  { value: 'hn', label: 'Hà Nội' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'dn', label: 'Đà Nẵng' },
  { value: 'hp', label: 'Hải Phòng' },
  { value: 'ct', label: 'Cần Thơ', disabled: true },
]

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Select (antd). Mặc định có tìm kiếm theo `label`, nút xoá, rộng 100%. `mode="multiple"` để chọn nhiều. Dùng trong form: xem `FormSelect`.\n\n```tsx\nimport { Select } from \'@/components/atoms\'\n\n<Select options={options} value={city} onChange={setCity} placeholder="Chọn tỉnh" />\n```',
      },
    },
  },
  args: { options: OPTIONS, placeholder: 'Chọn tỉnh / thành', onChange: fn() },
  argTypes: {
    mode: { control: 'inline-radio', options: [undefined, 'multiple', 'tags'] },
    size: { control: 'inline-radio', options: ['small', 'middle', 'large'] },
    status: { control: 'inline-radio', options: [undefined, 'warning', 'error'] },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Multiple: Story = {
  args: { mode: 'multiple', defaultValue: ['hn', 'dn'] },
}

export const Loading: Story = {
  args: { loading: true },
}
