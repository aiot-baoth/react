import type { Meta, StoryObj } from '@storybook/react-vite'
import ComponentsPage from './ComponentsPage'

const meta = {
  title: 'Pages/ComponentsPage',
  component: ComponentsPage,
  parameters: {
    docs: {
      description: {
        component: 'Trang chủ mẫu — minh hoạ ghép molecules/atoms (antd, MUI, Tailwind).',
      },
    },
  },
} satisfies Meta<typeof ComponentsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
