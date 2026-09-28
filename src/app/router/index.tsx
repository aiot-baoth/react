import { createBrowserRouter } from 'react-router-dom'
import { Loader } from '@/components/atoms'
import { MainLayout } from '@/components/templates'
import { ROUTES } from '@/constants'

/** Lazy load page: mỗi page là 1 chunk riêng. */
const page = (loader: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await loader()).default,
})

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    HydrateFallback: () => <Loader fullScreen />,
    children: [
      { path: ROUTES.HOME, lazy: page(() => import('@/pages/HomePage')) },
      { path: ROUTES.NOT_FOUND, lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
])
