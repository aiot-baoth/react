import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Checkbox, CheckboxGroup } from './Checkbox'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox (antd) và `CheckboxGroup` (chọn nhiều từ `options`). Dùng trong form: xem `FormCheckbox`.\n\n```tsx\nimport { Checkbox, CheckboxGroup } from '@/components/atoms'\n\n<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)}>Đồng ý</Checkbox>\n```",
      },
    },
  },
  args: { children: 'Tôi đồng ý', onChange: fn() },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox>Chưa chọn</Checkbox>
      <Checkbox defaultChecked>Đã chọn</Checkbox>
      <Checkbox indeterminate>Chọn một phần</Checkbox>
      <Checkbox disabled>Vô hiệu hoá</Checkbox>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <CheckboxGroup
      defaultValue={['react']}
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ]}
    />
  ),
}
