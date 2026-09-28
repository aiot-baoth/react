import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { Animate } from '@/components/atoms'
import { ErrorBoundary, Sidebar, Topbar, type SidebarItem } from '@/components/organisms'

export type DashboardLayoutProps = {
  /** Menu bên trái */
  menuItems: SidebarItem[]
}

/** Template: khung trang quản trị — Sidebar + Topbar + nội dung (`<Outlet />`). */
export function DashboardLayout({ menuItems }: DashboardLayoutProps) {
  const { pathname } = useLocation()

  return (
    <Layout className="min-h-screen">
      <Sidebar items={menuItems} />
      <Layout>
        <Topbar />
        <Layout.Content className="p-4 md:p-6">
          {/* key theo URL: đổi trang thì reset lỗi của trang trước */}
          <ErrorBoundary key={pathname}>
            {/* key theo URL: mỗi lần đổi trang chạy lại hiệu ứng vào trang */}
            <Animate key={pathname} preset="slideUp">
              <Outlet />
            </Animate>
          </ErrorBoundary>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
