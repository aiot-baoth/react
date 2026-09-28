import { Breadcrumb as AntdBreadcrumb } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useMatches } from 'react-router-dom'
import type { RouteHandle } from '@/types'

export type BreadcrumbItem = {
  title: ReactNode
  /** Không truyền = mục hiện tại (không click được) */
  to?: string
}

export type BreadcrumbProps = {
  /** Danh sách mục; không truyền thì tự sinh từ `handle.crumb` của các route đang khớp */
  items?: BreadcrumbItem[]
  className?: string
}

/** Tự sinh breadcrumb từ route (cần data router: createBrowserRouter / createMemoryRouter). */
function useRouteCrumbs(): BreadcrumbItem[] {
  const matches = useMatches()
  const { t } = useTranslation()

  const crumbs = matches.filter((m) => (m.handle as RouteHandle | undefined)?.crumb)
  return crumbs.map((match, index) => {
    const { crumb } = match.handle as Required<RouteHandle>
    const title = typeof crumb === 'function' ? crumb(match.params) : t(crumb)
    return { title, to: index < crumbs.length - 1 ? match.pathname : undefined }
  })
}

/** Molecule: breadcrumb (antd) + điều hướng bằng react-router. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const routeCrumbs = useRouteCrumbs()
  const list = items ?? routeCrumbs

  if (list.length === 0) return null

  return (
    <AntdBreadcrumb
      className={className}
      items={list.map((item) => ({
        title: item.to ? <Link to={item.to}>{item.title}</Link> : item.title,
      }))}
    />
  )
}
