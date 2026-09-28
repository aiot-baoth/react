import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Animate, Button } from '@/components/atoms'
import { Footer, Header, type HeaderNavItem } from '@/components/organisms'
import { ROUTES } from '@/constants'
import { selectIsAuthenticated, useAppSelector } from '@/store'

/** Template: khung trang public — Header + nội dung (`<Outlet />`) + Footer. */
export function MainLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const navItems: HeaderNavItem[] = [
    { label: t('menu.dashboard'), to: ROUTES.HOME },
    { label: t('menu.components'), to: ROUTES.COMPONENTS },
  ]

  return (
    <div className="flex min-h-full flex-col">
      <Header
        navItems={navItems}
        actions={
          !isAuthenticated && (
            <Button size="small" onClick={() => void navigate(ROUTES.LOGIN)}>
              {t('auth.login')}
            </Button>
          )
        }
      />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4">
        <Animate key={pathname} preset="fade">
          <Outlet />
        </Animate>
      </main>
      <Footer />
    </div>
  )
}
