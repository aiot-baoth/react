import type { Meta, StoryObj } from '@storybook/react-vite'
import PostListPage from './PostListPage'

const meta = {
  title: 'Pages/PostListPage',
  component: PostListPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: { component: 'Gọi API JSONPlaceholder thật; lọc/phân trang lưu trên URL.' },
    },
  },
} satisfies Meta<typeof PostListPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
