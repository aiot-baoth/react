import SearchOutlined from '@ant-design/icons/SearchOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Input dựa trên **Ant Design Input** (mặc định `allowClear`). Nhận toàn bộ props của antd Input.\n\n```tsx\nimport { Input } from '@/components/atoms'\n\n<Input value={value} onChange={(e) => setValue(e.target.value)} />\n```",
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text', description: 'Placeholder' },
    size: {
      control: 'inline-radio',
      options: ['small', 'middle', 'large'],
      description: 'Kích thước',
      table: { defaultValue: { summary: 'middle' } },
    },
    status: {
      control: 'inline-radio',
      options: [undefined, 'warning', 'error'],
      description: 'Trạng thái validate',
    },
    variant: {
      control: 'inline-radio',
      options: ['outlined', 'filled', 'borderless', 'underlined'],
      description: 'Kiểu viền',
      table: { defaultValue: { summary: 'outlined' } },
    },
    disabled: { control: 'boolean', description: 'Vô hiệu hoá' },
    allowClear: {
      control: 'boolean',
      description: 'Hiện nút xoá',
      table: { defaultValue: { summary: 'true' } },
    },
    maxLength: { control: 'number', description: 'Số ký tự tối đa' },
    showCount: { control: 'boolean', description: 'Hiện bộ đếm ký tự' },
    prefix: { control: false, description: 'Icon/nội dung phía trước' },
    suffix: { control: false, description: 'Icon/nội dung phía sau' },
  },
  args: {
    placeholder: 'Nhập nội dung...',
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} size="small" placeholder="Small" />
      <Input {...args} size="middle" placeholder="Middle" />
      <Input {...args} size="large" placeholder="Large" />
    </div>
  ),
}

export const Status: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} status="warning" placeholder="Warning" />
      <Input {...args} status="error" placeholder="Error" />
    </div>
  ),
}

export const WithIcon: Story = {
  args: { prefix: <UserOutlined />, suffix: <SearchOutlined />, placeholder: 'Tên đăng nhập' },
}

export const WithCount: Story = {
  args: { showCount: true, maxLength: 50 },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Không thể sửa' },
}
