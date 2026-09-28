import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from './Footer'

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Chân trang cho trang public: bản quyền (năm hiện tại) + link.\n\n```tsx\n<Footer links={[{ label: 'Điều khoản', to: '/terms' }]} />\n```",
      },
    },
  },
  args: {
    links: [
      { label: 'Điều khoản', to: '/terms' },
      { label: 'Bảo mật', to: '/privacy' },
      { label: 'GitHub', to: 'https://github.com' },
    ],
  },
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const NoLinks: Story = { args: { links: [] } }
