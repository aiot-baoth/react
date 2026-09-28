import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { Loader } from '@/components/atoms'
import { ROUTES } from '@/constants'
import type { RouteHandle } from '@/types'
import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'
import { RouteErrorBoundary } from './RouteErrorBoundary'

/** Lazy load page: mỗi page là 1 chunk riêng. */
const page = (loader: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await loader()).default,
})

/** Lazy load layout (named export) — trang login không phải tải Sidebar/Topbar... */
const layout =
  <K extends string>(loader: () => Promise<Record<K, React.ComponentType>>, name: K) =>
  async () => ({ Component: (await loader())[name] })

export const routes: RouteObject[] = [
  {
    errorElement: <RouteErrorBoundary />,
    HydrateFallback: () => <Loader fullScreen />,
    children: [
      // Chỉ cho khách: đã đăng nhập thì chuyển về trang chủ
      {
        element: <GuestRoute />,
        children: [
          {
            lazy: layout(() => import('@/components/templates/AuthLayout'), 'AuthLayout'),
            children: [
              { path: ROUTES.LOGIN, lazy: page(() => import('@/pages/LoginPage')) },
              { path: ROUTES.REGISTER, lazy: page(() => import('@/pages/RegisterPage')) },
            ],
          },
        ],
      },
      // Cần đăng nhập
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.HOME,
            lazy: layout(() => import('./menu'), 'AppDashboardLayout'),
            handle: { crumb: 'menu.dashboard' } satisfies RouteHandle,
            children: [
              { index: true, lazy: page(() => import('@/pages/DashboardPage')) },
              {
                path: 'posts',
                handle: { crumb: 'menu.posts' } satisfies RouteHandle,
                children: [
                  { index: true, lazy: page(() => import('@/pages/PostListPage')) },
                  {
                    path: ':id',
                    handle: { crumb: (params) => `#${params.id}` } satisfies RouteHandle,
                    lazy: page(() => import('@/pages/PostDetailPage')),
                  },
                ],
              },
              {
                path: 'components',
                handle: { crumb: 'menu.components' } satisfies RouteHandle,
                lazy: page(() => import('@/pages/ComponentsPage')),
              },
              // Ví dụ route theo role: { element: <ProtectedRoute roles={['admin']} />, children: [...] }
            ],
          },
        ],
      },
      // Trang public
      {
        lazy: layout(() => import('@/components/templates/MainLayout'), 'MainLayout'),
        children: [
          { path: ROUTES.FORBIDDEN, lazy: page(() => import('@/pages/ForbiddenPage')) },
          { path: ROUTES.SERVER_ERROR, lazy: page(() => import('@/pages/ServerErrorPage')) },
          { path: ROUTES.NOT_FOUND, lazy: page(() => import('@/pages/NotFoundPage')) },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
