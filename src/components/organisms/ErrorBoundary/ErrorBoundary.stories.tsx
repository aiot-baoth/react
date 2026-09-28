import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Button, Text } from '@/components/atoms'
import { ErrorBoundary } from './ErrorBoundary'

function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error('Lỗi render mẫu')
  return <Text variant="success">Component đang chạy bình thường.</Text>
}

const meta = {
  title: 'Organisms/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      description: {
        component:
          'Bắt lỗi render của cây con, hiện `ErrorState` + nút thử lại thay vì trắng cả trang. `DashboardLayout` đã bọc sẵn nội dung mỗi trang; bọc thêm quanh widget độc lập nếu muốn lỗi chỉ ảnh hưởng widget đó.\n\n```tsx\n<ErrorBoundary onError={(e) => Sentry.captureException(e)}>\n  <RevenueChart />\n</ErrorBoundary>\n```\nLỗi trong router (lazy load, loader) do `RouteErrorBoundary` (`errorElement`) xử lý.',
      },
    },
  },
  args: { children: null, onError: fn() },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: function Render(args) {
    const [explode, setExplode] = useState(false)
    return (
      <div className="flex flex-col items-start gap-3">
        <Button color="error" variant="outlined" onClick={() => setExplode(true)}>
          Gây lỗi
        </Button>
        <ErrorBoundary onError={args.onError} key={String(explode)}>
          <Bomb explode={explode} />
        </ErrorBoundary>
      </div>
    )
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Gây lỗi' }))
    await expect(await canvas.findByText('Đã có lỗi xảy ra')).toBeInTheDocument()
    await expect(args.onError).toHaveBeenCalled()
  },
}
