import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutlined'
import { Card } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Stagger, StaggerItem } from '@/components/atoms'
import { StatCard } from '@/components/molecules'
import { DataTable, PageHeader } from '@/components/organisms'
import { buildPath, ROUTES } from '@/constants'
import { usePosts } from '@/hooks'
import type { Post } from '@/services/api'
import { selectUser, useAppSelector } from '@/store'

const formatVnd = (value: number) => `${value.toLocaleString('vi-VN')}₫`

type Stat = {
  key: 'totalPosts' | 'totalUsers' | 'totalComments' | 'revenue'
  value: number
  trend: number
  icon: ReactNode
  format?: (value: number) => string
}

/** Số liệu mẫu — thay bằng API thống kê thật */
const STATS: Stat[] = [
  { key: 'totalPosts', value: 100, trend: 12, icon: <ArticleOutlinedIcon /> },
  { key: 'totalUsers', value: 10, trend: 4.5, icon: <PeopleOutlineIcon /> },
  { key: 'totalComments', value: 500, trend: -3.2, icon: <ChatBubbleOutlineIcon /> },
  {
    key: 'revenue',
    value: 128_500_000,
    trend: 8.1,
    icon: <MonetizationOnOutlinedIcon />,
    format: formatVnd,
  },
]

/** Page: tổng quan — thẻ số liệu + bài viết mới nhất. Số liệu là dữ liệu mẫu. */
export default function DashboardPage() {
  const { t } = useTranslation()
  const user = useAppSelector(selectUser)
  const { data: posts, isPending, error, refetch } = usePosts({ _limit: 5 })

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t('dashboard.title')}
        subtitle={t('dashboard.welcome', { name: user?.name ?? '' })}
        breadcrumb={false}
      />
      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <StaggerItem key={stat.key}>
            <StatCard
              title={t(`dashboard.${stat.key}`)}
              value={stat.value}
              formatValue={stat.format}
              trend={stat.trend}
              trendLabel={t('dashboard.vsLastMonth')}
              icon={stat.icon}
            />
          </StaggerItem>
        ))}
      </Stagger>
      <Card title={t('dashboard.latestPosts')}>
        <DataTable<Post>
          data={posts}
          loading={isPending}
          error={error}
          onRetry={() => void refetch()}
          columns={[
            { title: t('post.fieldId'), dataIndex: 'id', width: 70 },
            {
              title: t('post.fieldTitle'),
              dataIndex: 'title',
              render: (title: string, post) => (
                <Link to={buildPath(ROUTES.POST_DETAIL, { id: post.id })}>{title}</Link>
              ),
            },
            {
              title: t('post.fieldUser'),
              dataIndex: 'userId',
              width: 120,
              render: (id: number) => t('post.userOption', { id }),
            },
          ]}
        />
      </Card>
    </div>
  )
}
