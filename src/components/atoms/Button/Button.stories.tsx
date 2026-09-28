import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Button dựa trên **MUI Button** (mặc định `variant="contained"`, không đổ bóng). Nhận toàn bộ props của MUI Button + `loading`.\n\n```tsx\nimport { Button } from \'@/components/atoms\'\n\n<Button onClick={save} loading={isSaving}>Lưu</Button>\n```',
      },
    },
  },
  argTypes: {
    children: { control: 'text', description: 'Nội dung button' },
    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'text'],
      description: 'Kiểu hiển thị',
      table: { defaultValue: { summary: 'contained' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'inherit'],
      description: 'Màu theo theme',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Kích thước',
      table: { defaultValue: { summary: 'medium' } },
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean', description: 'Vô hiệu hoá' },
    fullWidth: { control: 'boolean', description: 'Chiếm toàn bộ chiều ngang' },
    className: { control: 'text', description: 'Class Tailwind bổ sung' },
    startIcon: { control: false, description: 'Icon bên trái' },
    endIcon: { control: false, description: 'Icon bên phải' },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
    </div>
  ),
}

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const).map((color) => (
        <Button key={color} {...args} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args} startIcon={<AddIcon />}>
        Thêm mới
      </Button>
      <Button {...args} color="error" variant="outlined" endIcon={<DeleteIcon />}>
        Xoá
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true, children: 'Đang lưu...' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const TailwindOverride: Story = {
  name: 'Override bằng Tailwind',
  args: {
    className: 'w-full rounded-full bg-success!',
    children: 'className="w-full rounded-full bg-success!"',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tailwind utilities override được style MUI. Dùng hậu tố `!` khi cần ép `important`.',
      },
    },
  },
}
