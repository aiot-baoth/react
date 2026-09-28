import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { Pagination } from './Pagination'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'Phân trang (antd) có hiện tổng số mục + đổi số dòng/trang. `DataTable` đã dùng sẵn.\n\n```tsx\n<Pagination page={page} pageSize={pageSize} total={total} onChange={(p, s) => setParams({ page: p, pageSize: s })} />\n```',
      },
    },
  },
  args: { page: 1, pageSize: 10, total: 235, onChange: fn() },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: function Render(args) {
    const [state, setState] = useState({ page: args.page, pageSize: args.pageSize })
    return (
      <Pagination
        {...args}
        {...state}
        onChange={(page, pageSize) => {
          setState({ page, pageSize })
          args.onChange(page, pageSize)
        }}
      />
    )
  },
}

export const Simple: Story = { args: { simple: true, showSizeChanger: false } }
