import type { Meta, StoryObj } from '@storybook/react-vite'
import HomePage from './HomePage'

const meta = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    docs: {
      description: {
        component: 'Trang chủ mẫu — minh hoạ ghép molecules/atoms (antd, MUI, Tailwind).',
      },
    },
  },
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
