import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Header } from './Header'

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Header gồm **Logo + Navigation + SearchBar**. Tên app lấy từ `VITE_APP_NAME`. Link active được tô màu primary (dùng `NavLink` của react-router).\n\n```tsx\nimport { Header } from '@/components/organisms'\n\n<Header navItems={[{ label: 'Trang chủ', to: '/' }]} onSearch={handleSearch} />\n```",
      },
    },
  },
  args: {
    navItems: [
      { label: 'Trang chủ', to: '/' },
      { label: 'Sản phẩm', to: '/products' },
      { label: 'Liên hệ', to: '/contact' },
    ],
    onSearch: fn(),
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutNav: Story = {
  args: { navItems: [] },
}
