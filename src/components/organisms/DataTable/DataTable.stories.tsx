import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { fn } from 'storybook/test'
import { Button, StatusTag } from '@/components/atoms'
import { ApiError } from '@/services/api'
import { DataTable, type SortState } from './DataTable'

type User = { id: number; name: string; email: string; status: 'active' | 'blocked' }

const USERS: User[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `Người dùng ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 5 === 0 ? 'blocked' : 'active',
}))

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80, sorter: true },
  { title: 'Tên', dataIndex: 'name', sorter: true },
  { title: 'Email', dataIndex: 'email' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (s: User['status']) => (
      <StatusTag status={s === 'active' ? 'success' : 'error'}>
        {s === 'active' ? 'Hoạt động' : 'Đã khoá'}
      </StatusTag>
    ),
  },
]

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable<User>,
  parameters: {
    docs: {
      description: {
        component:
          "Bảng dữ liệu (antd Table) cho màn danh sách: **phân trang + sort phía server**, trạng thái loading / rỗng / lỗi dựng sẵn. Cột muốn sort phía server: `sorter: true`.\n\n```tsx\nconst [params, setParams] = useQueryParams({ page: '1', pageSize: '10', sort: '', order: '' })\nconst { data, isFetching, error, refetch } = usePostPage(...)\n\n<DataTable\n  columns={columns}\n  data={data?.items}\n  loading={isFetching}\n  error={error}\n  onRetry={refetch}\n  sort={{ field: params.sort, order: params.order }}\n  onSortChange={({ field, order }) => setParams({ sort: field, order, page: 1 })}\n  pagination={{ page, pageSize, total: data?.total ?? 0, onChange: (page, pageSize) => setParams({ page, pageSize }) }}\n/>\n```\nXem ví dụ đầy đủ: `src/pages/PostListPage`.",
      },
    },
  },
  args: { columns, onRetry: fn() },
  argTypes: { columns: { control: false }, data: { control: false } },
} satisfies Meta<typeof DataTable<User>>

export default meta
type Story = StoryObj<typeof meta>

/** Giả lập server: sort + cắt trang ở client */
export const ServerSide: Story = {
  name: 'Phân trang + sort',
  render: function Render(args) {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState<SortState>({})
    const rows = useMemo(() => {
      const sorted = [...USERS]
      if (sort.field) {
        const f = sort.field as keyof User
        sorted.sort((a, b) => (a[f] > b[f] ? 1 : -1) * (sort.order === 'desc' ? -1 : 1))
      }
      return sorted.slice((page - 1) * pageSize, page * pageSize)
    }, [page, pageSize, sort])
    return (
      <DataTable<User>
        {...args}
        data={rows}
        sort={sort}
        onSortChange={(s) => {
          setSort(s)
          setPage(1)
        }}
        pagination={{
          page,
          pageSize,
          total: USERS.length,
          onChange: (p, s) => {
            setPage(p)
            setPageSize(s)
          },
        }}
      />
    )
  },
}

export const Loading: Story = { args: { data: [], loading: true } }

export const Empty: Story = { args: { data: [], emptyAction: <Button>Tạo mới</Button> } }

export const Error: Story = { args: { data: [], error: new ApiError('Internal error', 500) } }
