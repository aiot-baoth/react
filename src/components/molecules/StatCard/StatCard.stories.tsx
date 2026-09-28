import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatCard } from './StatCard'

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: {
    docs: {
      description: {
        component:
          'Thẻ số liệu cho dashboard: tiêu đề, giá trị, icon, % tăng/giảm. `value` là number thì có hiệu ứng số chạy (`AnimatedNumber`), định dạng qua `formatValue`.\n\n```tsx\n<StatCard title="Doanh thu" value="128.500.000₫" trend={8.1} trendLabel="so với tháng trước" icon={<MoneyIcon />} />\n```',
      },
    },
  },
  args: {
    title: 'Bài viết',
    value: '1.024',
    trend: 12,
    trendLabel: 'so với tháng trước',
    icon: <ArticleOutlinedIcon />,
  },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Decrease: Story = {
  args: {
    title: 'Doanh thu',
    value: '98.000.000₫',
    trend: -4.3,
    icon: <MonetizationOnOutlinedIcon />,
  },
}

export const AnimatedValue: Story = {
  name: 'Số chạy (value là number)',
  args: {
    title: 'Doanh thu',
    value: 128_500_000,
    formatValue: (v: number) => `${v.toLocaleString('vi-VN')}₫`,
    icon: <MonetizationOnOutlinedIcon />,
  },
}

export const Loading: Story = { args: { loading: true } }
