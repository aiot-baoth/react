import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import { LanguageSwitcher, ThemeToggle, UserMenu } from '@/components/molecules'
import { NotificationCenter } from '@/components/organisms/NotificationCenter'
import { ROUTES } from '@/constants'
import { useNotifications } from '@/hooks'
import {
  logout,
  selectSidebarCollapsed,
  selectUser,
  toggleSidebar,
  useAppDispatch,
  useAppSelector,
} from '@/store'

/** Organism: thanh trên của trang quản trị — nút thu gọn sidebar, thông báo, ngôn ngữ, theme, user. */
export function Topbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const collapsed = useAppSelector(selectSidebarCollapsed)
  const user = useAppSelector(selectUser)
  const notifications = useNotifications()

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b border-border bg-surface px-4">
      <IconButton aria-label="toggle sidebar" onClick={() => dispatch(toggleSidebar())}>
        {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
      </IconButton>
      <div className="ml-auto flex items-center gap-1">
        <NotificationCenter
          items={notifications.items}
          onRead={notifications.markRead}
          onReadAll={notifications.markAllRead}
        />
        <LanguageSwitcher />
        <ThemeToggle />
        {user && (
          <UserMenu
            user={user}
            onLogout={() => {
              dispatch(logout())
              void navigate(ROUTES.LOGIN)
            }}
          />
        )}
      </div>
    </header>
  )
}
