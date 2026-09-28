import type { Meta, StoryObj } from '@storybook/react-vite'
import NotFoundPage from './NotFoundPage'

const meta = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    docs: { description: { component: 'Trang 404, nút quay về trang chủ.' } },
  },
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
