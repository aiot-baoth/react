import { Outlet } from 'react-router-dom'
import { Header, type HeaderNavItem } from '@/components/organisms'
import { ROUTES } from '@/constants'

const NAV_ITEMS: HeaderNavItem[] = [{ label: 'Trang chủ', to: ROUTES.HOME }]

/** Template: khung layout chính (Header + nội dung trang). */
export function MainLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <Header navItems={NAV_ITEMS} />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
