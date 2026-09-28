import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'
import { FilterBar, type FilterValues } from './FilterBar'

const meta = {
  title: 'Organisms/FilterBar',
  component: FilterBar,
  parameters: {
    docs: {
      description: {
        component:
          "Thanh bộ lọc khai báo bằng config (`text`, `select`, `date`, `dateRange`). Giá trị luôn là chuỗi (ngày: `YYYY-MM-DD`) để lưu thẳng lên URL bằng `useQueryParams` — reload / chia sẻ link vẫn giữ bộ lọc.\n\n```tsx\nconst [params, setParams] = useQueryParams({ page: '1', q: '', status: '' })\n\n<FilterBar\n  values={{ q: params.q, status: params.status }}\n  onSubmit={(values) => setParams({ ...values, page: 1 })}\n  fields={[\n    { type: 'text', name: 'q', label: 'Từ khoá' },\n    { type: 'select', name: 'status', label: 'Trạng thái', options },\n  ]}\n/>\n```",
      },
    },
  },
  args: {
    values: {},
    onSubmit: fn(),
    fields: [
      { type: 'text', name: 'q', label: 'Từ khoá', placeholder: 'Tên, email...' },
      {
        type: 'select',
        name: 'status',
        label: 'Trạng thái',
        options: [
          { value: 'active', label: 'Hoạt động' },
          { value: 'blocked', label: 'Đã khoá' },
        ],
      },
      { type: 'date', name: 'createdAt', label: 'Ngày tạo' },
      { type: 'dateRange', name: 'period', label: 'Khoảng thời gian' },
    ],
  },
  argTypes: { fields: { control: false } },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: function Render(args) {
    const [values, setValues] = useState<FilterValues>({ q: 'an', createdAt: '2026-01-15' })
    return (
      <div className="flex flex-col gap-3">
        <FilterBar
          {...args}
          values={values}
          onSubmit={(v) => {
            setValues(v)
            args.onSubmit(v)
          }}
        />
        <pre className="m-0 rounded-app bg-black/5 p-3 text-xs text-text dark:bg-white/10">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    )
  },
}

export const Submit: Story = {
  name: 'Tương tác: nhập từ khoá & lọc',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByPlaceholderText('Tên, email...'), 'react')
    await userEvent.click(canvas.getByRole('button', { name: /lọc/i }))
    await expect(args.onSubmit).toHaveBeenCalledWith({
      q: 'react',
      status: undefined,
      createdAt: undefined,
      period: undefined,
    })
  },
}
