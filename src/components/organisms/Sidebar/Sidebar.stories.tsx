import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    router: { initialEntries: ['/posts/12'] },
    docs: {
      description: {
        component:
          "Menu điều hướng bên trái (antd Layout.Sider + Menu). Mục đang chọn tự khớp theo URL (`/posts/12` -> \"Bài viết\"). Thu gọn/mở rộng qua Redux (`toggleSidebar`), tự thu gọn khi màn hình < `lg`.\n\nKhai báo menu ở `src/app/router/menu.tsx`:\n```tsx\n{ path: '/posts', label: t('menu.posts'), icon: <ArticleIcon /> }\n```",
      },
    },
  },
  args: {
    items: [
      { path: '/', label: 'Tổng quan', icon: <DashboardOutlinedIcon fontSize="small" /> },
      { path: '/posts', label: 'Bài viết', icon: <ArticleOutlinedIcon fontSize="small" /> },
      {
        path: '/settings',
        label: 'Cài đặt',
        icon: <SettingsOutlinedIcon fontSize="small" />,
        children: [
          { path: '/settings/profile', label: 'Hồ sơ' },
          { path: '/settings/security', label: 'Bảo mật' },
        ],
      },
    ],
  },
  argTypes: { items: { control: false } },
  decorators: [
    (Story) => (
      <div className="flex h-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
