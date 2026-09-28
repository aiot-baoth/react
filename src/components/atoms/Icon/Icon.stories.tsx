import AddIcon from '@mui/icons-material/Add'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'Hiển thị icon từ `@mui/icons-material` với kích thước/màu thống nhất. Tìm icon tại https://mui.com/material-ui/material-icons/\n\n```tsx\nimport StarIcon from \'@mui/icons-material/Star\'\nimport { Icon } from \'@/components/atoms\'\n\n<Icon icon={StarIcon} size="lg" color="warning" />\n```',
      },
    },
  },
  args: { icon: StarIcon, size: 'md', color: 'primary' },
  argTypes: {
    icon: { control: false },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: {
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'disabled',
        'action',
      ],
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex gap-3">
      <Icon icon={AddIcon} color="primary" />
      <Icon icon={StarIcon} color="warning" />
      <Icon icon={FavoriteIcon} color="error" />
      <Icon icon={StarIcon} color="success" />
      <Icon icon={StarIcon} color="disabled" />
    </div>
  ),
}
