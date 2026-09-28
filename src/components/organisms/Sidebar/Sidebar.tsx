import { Layout, Menu, type MenuProps } from 'antd'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/atoms'
import { ENV } from '@/constants'
import {
  selectSidebarCollapsed,
  setSidebarCollapsed,
  useAppDispatch,
  useAppSelector,
} from '@/store'

export type SidebarItem = {
  /** Đường dẫn route, dùng làm key + điều hướng */
  path: string
  label: ReactNode
  icon?: ReactNode
  children?: SidebarItem[]
}

export type SidebarProps = {
  items: SidebarItem[]
  width?: number
}

const toMenuItems = (items: SidebarItem[]): MenuProps['items'] =>
  items.map((item) => ({
    key: item.path,
    icon: item.icon,
    label: item.label,
    children: item.children ? toMenuItems(item.children) : undefined,
  }))

/** Tìm mục khớp dài nhất với URL hiện tại: /posts/1 -> "/posts" */
function findSelectedKey(items: SidebarItem[], pathname: string): string | undefined {
  const all = items.flatMap((i) => [i, ...(i.children ?? [])])
  return all
    .filter((i) => pathname === i.path || pathname.startsWith(`${i.path === '/' ? '' : i.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0]?.path
}

/** Organism: menu điều hướng bên trái, thu gọn/mở rộng qua Redux (`uiSlice`). */
export function Sidebar({ items, width = 240 }: SidebarProps) {
  const collapsed = useAppSelector(selectSidebarCollapsed)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const selectedKey = findSelectedKey(items, pathname)

  return (
    <Layout.Sider
      width={width}
      collapsed={collapsed}
      collapsedWidth={64}
      breakpoint="lg"
      onBreakpoint={(broken) => dispatch(setSidebarCollapsed(broken))}
      trigger={null}
      theme="light"
      className="sticky top-0 h-screen overflow-auto border-r border-border"
    >
      <div className="flex h-16 items-center overflow-hidden px-4">
        <Logo text={collapsed ? ENV.APP_NAME.charAt(0) : ENV.APP_NAME} />
      </div>
      <Menu
        mode="inline"
        items={toMenuItems(items)}
        selectedKeys={selectedKey ? [selectedKey] : []}
        onClick={({ key }) => void navigate(key)}
        className="border-e-0!"
      />
    </Layout.Sider>
  )
}
