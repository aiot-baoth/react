import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Avatar (antd). Không có `src` thì hiện 2 chữ cái đầu của `name`, màu nền cố định theo tên.\n\n```tsx\nimport { Avatar } from '@/components/atoms'\n\n<Avatar name={user.name} src={user.avatar} />\n```",
      },
    },
  },
  args: { name: 'Nguyễn Văn An' },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'default', 'large'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Initials: Story = {
  render: () => (
    <div className="flex gap-2">
      {['Nguyễn Văn An', 'Trần Bình', 'Lê Thị Cúc', 'Phạm Dũng', 'Hoàng'].map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/80?img=12', size: 'large' },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Avatar {...args} size="small" />
      <Avatar {...args} />
      <Avatar {...args} size="large" />
      <Avatar {...args} size={64} shape="square" />
    </div>
  ),
}
