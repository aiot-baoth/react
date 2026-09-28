import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants'
import ForbiddenPage from '@/pages/ForbiddenPage'
import { selectIsAuthenticated, selectUser, useAppSelector } from '@/store'

export type ProtectedRouteProps = {
  /** Chỉ cho vào khi user có ít nhất 1 role trong danh sách; thiếu quyền -> trang 403 */
  roles?: string[]
}

/** Chặn route khi chưa đăng nhập -> chuyển về /login, đăng nhập xong quay lại đúng trang cũ. */
export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }
  if (roles?.length && !roles.some((role) => user?.roles?.includes(role))) {
    return <ForbiddenPage />
  }
  return <Outlet />
}
