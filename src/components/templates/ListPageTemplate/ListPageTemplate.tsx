import { Card } from 'antd'
import type { ReactNode } from 'react'
import { PageHeader, type PageHeaderProps } from '@/components/organisms'

export type ListPageTemplateProps = {
  /** Props cho PageHeader (tiêu đề, nút Tạo mới...) */
  header: PageHeaderProps
  /** Thanh bộ lọc, thường là `<FilterBar />` */
  filters?: ReactNode
  /** Bảng dữ liệu, thường là `<DataTable />` */
  children: ReactNode
}

/** Template: màn danh sách chuẩn — PageHeader + FilterBar + DataTable. */
export function ListPageTemplate({ header, filters, children }: ListPageTemplateProps) {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader className="mb-0" {...header} />
      {filters}
      <Card>{children}</Card>
    </div>
  )
}
