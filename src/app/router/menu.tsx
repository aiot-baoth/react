import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
import { useTranslation } from 'react-i18next'
import type { SidebarItem } from '@/components/organisms'
import { DashboardLayout } from '@/components/templates'
import { ROUTES } from '@/constants'

/** Menu trái của trang quản trị — thêm màn mới thì khai báo ở đây. */
function useMenuItems(): SidebarItem[] {
  const { t } = useTranslation()
  return [
    {
      path: ROUTES.HOME,
      label: t('menu.dashboard'),
      icon: <DashboardOutlinedIcon fontSize="small" />,
    },
    { path: ROUTES.POSTS, label: t('menu.posts'), icon: <ArticleOutlinedIcon fontSize="small" /> },
    {
      path: ROUTES.COMPONENTS,
      label: t('menu.components'),
      icon: <WidgetsOutlinedIcon fontSize="small" />,
    },
  ]
}

export function AppDashboardLayout() {
  return <DashboardLayout menuItems={useMenuItems()} />
}
