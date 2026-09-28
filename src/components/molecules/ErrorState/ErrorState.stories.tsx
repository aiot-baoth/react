import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ApiError } from '@/services/api'
import { ErrorState } from './ErrorState'

const meta = {
  title: 'Molecules/ErrorState',
  component: ErrorState,
  parameters: {
    docs: {
      description: {
        component:
          'Hiển thị lỗi kèm nút thử lại. Truyền `error` (ApiError) là tự chọn hình + tiêu đề theo HTTP status (403/404/5xx), lỗi mạng hiện "Không thể kết nối tới máy chủ".\n\n```tsx\nconst { error, refetch } = useQuery(...)\nif (error) return <ErrorState error={error} onRetry={refetch} />\n```',
      },
    },
  },
  args: { onRetry: fn() },
  argTypes: { error: { control: false } },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { error: new Error('Timeout sau 15 giây') } }
export const Forbidden: Story = { args: { error: new ApiError('Forbidden', 403) } }
export const NotFound: Story = { args: { error: new ApiError('Not found', 404) } }
export const ServerError: Story = { args: { error: new ApiError('Internal error', 500) } }
export const NetworkError: Story = { args: { error: new ApiError('Network Error') } }
