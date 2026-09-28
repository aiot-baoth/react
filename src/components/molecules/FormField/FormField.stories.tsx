import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { FormField } from './FormField'

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'Ghép **Label + Input + thông báo lỗi**. Nhận thêm toàn bộ props của `Input` (antd). `id` tự sinh nếu không truyền, label gắn `htmlFor` đúng input.\n\n```tsx\nimport { FormField } from \'@/components/molecules\'\n\n<FormField label="Email" required value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />\n```',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder' },
    disabled: { control: 'boolean', description: 'Vô hiệu hoá' },
  },
  args: {
    label: 'Họ tên',
    placeholder: 'Nguyễn Văn A',
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Required: Story = {
  args: { required: true },
}

export const WithError: Story = {
  args: { required: true, error: 'Vui lòng nhập họ tên' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Không thể sửa' },
}

export const Validation: Story = {
  name: 'Ví dụ validate',
  render: function Render(args) {
    const [email, setEmail] = useState('')
    const error = email && !/^\S+@\S+\.\S+$/.test(email) ? 'Email không hợp lệ' : undefined
    return (
      <FormField
        {...args}
        label="Email"
        placeholder="you@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
    )
  },
}
