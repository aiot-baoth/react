import type { Meta, StoryObj } from '@storybook/react-vite'
import dayjs from 'dayjs'
import { fn } from 'storybook/test'
import { DatePicker, RangePicker } from './DatePicker'

const meta = {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          "DatePicker / RangePicker (antd, **dayjs**). Mặc định định dạng `DD/MM/YYYY`, lịch theo ngôn ngữ hiện tại. Giá trị là `Dayjs`. Dùng trong form: xem `FormDatePicker` + `dateRule` (Zod).\n\n```tsx\nimport { DatePicker, RangePicker } from '@/components/atoms'\n\n<DatePicker value={date} onChange={setDate} />\n<RangePicker value={range} onChange={setRange} />\n```",
      },
    },
  },
  args: { onChange: fn() },
  argTypes: {
    picker: { control: 'inline-radio', options: ['date', 'week', 'month', 'quarter', 'year'] },
    showTime: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithTime: Story = {
  args: { showTime: true, defaultValue: dayjs('2026-01-15 09:30') },
}

export const DisablePast: Story = {
  name: 'Không cho chọn ngày quá khứ',
  args: { disabledDate: (d) => d.isBefore(dayjs(), 'day') },
}

export const Range: Story = {
  render: () => <RangePicker />,
}
