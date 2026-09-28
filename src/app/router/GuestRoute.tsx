import { Navigate, Outlet, useLocation, type Location } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { selectIsAuthenticated, useAppSelector } from '@/store'

/** Route chỉ cho khách (login, register): đã đăng nhập thì chuyển về trang trước đó / trang chủ. */
export function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()
  const from = (location.state as { from?: Location } | null)?.from

  if (isAuthenticated) {
    return <Navigate to={from ? `${from.pathname}${from.search}` : ROUTES.HOME} replace />
  }
  return <Outlet />
}
