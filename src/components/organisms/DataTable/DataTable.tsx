import { Table, type TableProps } from 'antd'
import type { ReactNode } from 'react'
import { EmptyState, ErrorState, Pagination } from '@/components/molecules'

export type SortState = { field?: string; order?: 'asc' | 'desc' }

/** dataIndex có thể là mảng (['user', 'name']) -> "user.name" */
function toFieldKey(value: unknown): string | undefined {
  if (Array.isArray(value)) return value.map((v) => String(v as string | number)).join('.')
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return undefined
}

export type DataTableProps<T> = Omit<
  TableProps<T>,
  'pagination' | 'onChange' | 'dataSource' | 'loading'
> & {
  data?: T[]
  loading?: boolean
  /** Lỗi khi tải dữ liệu -> hiện ErrorState (kèm nút thử lại nếu có `onRetry`) */
  error?: unknown
  onRetry?: () => void
  /** Phân trang phía server; bỏ trống = không phân trang */
  pagination?: {
    page: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
  /** Sort phía server: cột phải có `sorter: true` và `dataIndex`/`key` */
  sort?: SortState
  onSortChange?: (sort: SortState) => void
  /** Nút trong EmptyState, vd "Tạo mới" */
  emptyAction?: ReactNode
}

/**
 * Organism: bảng dữ liệu (antd Table) cho màn danh sách — phân trang, sort phía server,
 * trạng thái loading / rỗng / lỗi dựng sẵn.
 */
export function DataTable<T extends object>({
  data,
  loading,
  error,
  onRetry,
  pagination,
  sort,
  onSortChange,
  emptyAction,
  columns,
  rowKey = 'id',
  ...rest
}: DataTableProps<T>) {
  if (error && !data?.length) return <ErrorState error={error} onRetry={onRetry} />

  // Đánh dấu cột đang sort để antd hiện mũi tên đúng
  const sortedColumns = columns?.map((col) => {
    const key = toFieldKey('dataIndex' in col ? col.dataIndex : col.key)
    if (!col.sorter || !sort?.field || key !== sort.field) return { ...col, sortOrder: null }
    return { ...col, sortOrder: sort.order === 'asc' ? ('ascend' as const) : ('descend' as const) }
  })

  return (
    <div className="flex flex-col gap-4">
      <Table<T>
        rowKey={rowKey}
        columns={sortedColumns}
        dataSource={data}
        loading={loading}
        pagination={false}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: <EmptyState variant="simple" action={emptyAction} /> }}
        onChange={(_p, _f, sorter) => {
          const s = Array.isArray(sorter) ? sorter[0] : sorter
          const field = s.order ? toFieldKey(s.field ?? s.columnKey) : undefined
          onSortChange?.({
            field,
            order: s.order === 'ascend' ? 'asc' : s.order ? 'desc' : undefined,
          })
        }}
        {...rest}
      />
      {pagination && pagination.total > 0 && (
        <div className="flex justify-end">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  )
}
