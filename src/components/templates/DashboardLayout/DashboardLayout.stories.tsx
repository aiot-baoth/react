import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Route, Routes } from 'react-router-dom'
import { DashboardLayout } from './DashboardLayout'

const meta = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Khung trang quản trị: **Sidebar + Topbar + nội dung** (`<Outlet />`, đã bọc `ErrorBoundary`). Dùng làm `element` cho route cha đã qua `ProtectedRoute` — xem `src/app/router`.',
      },
    },
  },
  args: {
    menuItems: [
      { path: '/', label: 'Tổng quan', icon: <DashboardOutlinedIcon fontSize="small" /> },
      { path: '/posts', label: 'Bài viết', icon: <ArticleOutlinedIcon fontSize="small" /> },
    ],
  },
  argTypes: { menuItems: { control: false } },
  render: (args) => (
    <Routes>
      <Route element={<DashboardLayout {...args} />}>
        <Route
          path="*"
          element={
            <div className="grid h-96 place-items-center rounded-app border-2 border-dashed border-border text-text-secondary">
              Nội dung trang (Outlet)
            </div>
          }
        />
      </Route>
    </Routes>
  ),
} satisfies Meta<typeof DashboardLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
