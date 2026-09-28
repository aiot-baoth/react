import type { Meta, StoryObj } from '@storybook/react-vite'
import PostDetailPage from './PostDetailPage'

const meta = {
  title: 'Pages/PostDetailPage',
  component: PostDetailPage,
  parameters: {
    // Trang đọc `:id` từ URL -> khai báo route cho story
    router: { initialEntries: ['/posts/1'], path: '/posts/:id' },
    docs: {
      description: { component: 'Gọi API JSONPlaceholder thật (`/posts/1`, `/posts/1/comments`).' },
    },
  },
} satisfies Meta<typeof PostDetailPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
