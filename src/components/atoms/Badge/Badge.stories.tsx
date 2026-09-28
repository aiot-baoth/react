import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '../Avatar'
import { Badge } from './Badge'

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Badge (antd) — số đếm / chấm đỏ trên icon, avatar. Quá 99 hiện `99+`.\n\n```tsx\nimport { Badge } from '@/components/atoms'\n\n<Badge count={unread}><BellIcon /></Badge>\n```",
      },
    },
  },
  args: { count: 5, children: <Avatar name="An" shape="square" /> },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Badge count={3}>
        <NotificationsNoneOutlinedIcon />
      </Badge>
      <Badge count={120}>
        <Avatar name="Bình" shape="square" />
      </Badge>
      <Badge dot>
        <NotificationsNoneOutlinedIcon />
      </Badge>
      <Badge status="success" text="Online" />
      <Badge status="error" text="Offline" />
    </div>
  ),
}
