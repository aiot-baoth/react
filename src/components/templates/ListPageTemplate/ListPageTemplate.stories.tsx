import AddIcon from '@mui/icons-material/Add'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from '@/components/atoms'
import { DataTable, FilterBar } from '@/components/organisms'
import { ListPageTemplate } from './ListPageTemplate'

const meta = {
  title: 'Templates/ListPageTemplate',
  component: ListPageTemplate,
  parameters: {
    docs: {
      description: {
        component:
          "Màn danh sách chuẩn: **PageHeader + FilterBar + DataTable** trong card. Ví dụ đầy đủ (URL params, CRUD): `src/pages/PostListPage`.\n\n```tsx\n<ListPageTemplate header={{ title: 'Người dùng', extra: <Button>Tạo mới</Button> }} filters={<FilterBar ... />}>\n  <DataTable ... />\n</ListPageTemplate>\n```",
      },
    },
  },
  args: {
    header: {
      title: 'Người dùng',
      subtitle: 'Quản lý tài khoản',
      breadcrumb: [{ title: 'Tổng quan', to: '/' }, { title: 'Người dùng' }],
    },
    children: null,
  },
  // JSX đặt trong render (không đặt trong args) để docs hiển thị đúng tên component
  render: (args) => (
    <ListPageTemplate
      header={{ ...args.header, extra: <Button startIcon={<AddIcon />}>Tạo mới</Button> }}
      filters={
        <FilterBar
          values={{}}
          onSubmit={fn()}
          fields={[{ type: 'text', name: 'q', label: 'Từ khoá' }]}
        />
      }
    >
      <DataTable
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Tên', dataIndex: 'name' },
        ]}
        data={[
          { id: 1, name: 'Nguyễn Văn An' },
          { id: 2, name: 'Trần Bình' },
        ]}
      />
    </ListPageTemplate>
  ),
  argTypes: {
    header: { control: false },
    filters: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof ListPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
