import { Card, Tabs } from 'antd'
import type { ReactNode } from 'react'
import { Skeleton } from '@/components/atoms'
import { ErrorState } from '@/components/molecules'
import { PageHeader, type PageHeaderProps } from '@/components/organisms'

export type DetailTab = { key: string; label: ReactNode; children: ReactNode }

export type DetailPageTemplateProps = {
  header: PageHeaderProps
  /** Các tab nội dung; chỉ 1 tab thì không hiện thanh tab */
  tabs: DetailTab[]
  activeTab?: string
  onTabChange?: (key: string) => void
  /** Cột phụ bên phải (thông tin tóm tắt, thao tác nhanh...) */
  aside?: ReactNode
  loading?: boolean
  error?: unknown
  onRetry?: () => void
}

/** Template: màn chi tiết — PageHeader + các tab + cột phụ, có sẵn trạng thái loading / lỗi. */
export function DetailPageTemplate({
  header,
  tabs,
  activeTab,
  onTabChange,
  aside,
  loading,
  error,
  onRetry,
}: DetailPageTemplateProps) {
  const body = error ? (
    <ErrorState error={error} onRetry={onRetry} />
  ) : loading ? (
    <Skeleton paragraph={{ rows: 6 }} />
  ) : tabs.length === 1 ? (
    tabs[0].children
  ) : (
    <Tabs activeKey={activeTab} onChange={onTabChange} items={tabs} />
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader className="mb-0" {...header} />
      <div className={aside ? 'grid gap-4 lg:grid-cols-[1fr_320px]' : undefined}>
        <Card>{body}</Card>
        {aside && !error && <aside className="flex flex-col gap-4">{aside}</aside>}
      </div>
    </div>
  )
}
