import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Link thống nhất style. Link nội bộ dùng react-router (không reload trang); link ngoài (`http...`) tự mở tab mới với `rel="noopener noreferrer"` và icon ↗.\n\n```tsx\nimport { Link } from \'@/components/atoms\'\n\n<Link to="/posts/1">Xem bài viết</Link>\n<Link to="https://react.dev">Tài liệu React</Link>\n```',
      },
    },
  },
  args: { to: '/posts/1', children: 'Xem bài viết #1' },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Internal: Story = {}

export const External: Story = {
  args: { to: 'https://react.dev', children: 'Tài liệu React' },
}

export const ExternalNoIcon: Story = {
  args: { to: 'https://react.dev', children: 'Không hiện icon', showExternalIcon: false },
}
