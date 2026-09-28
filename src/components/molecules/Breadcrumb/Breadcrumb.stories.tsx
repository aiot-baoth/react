import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumb (antd) điều hướng bằng react-router.\n\n- **Tự sinh từ route** (không truyền `items`): khai báo `handle.crumb` trong router — key i18n hoặc hàm nhận params:\n```tsx\n{ path: 'posts', handle: { crumb: 'menu.posts' } satisfies RouteHandle, children: [\n  { path: ':id', handle: { crumb: (p) => `#${p.id}` } },\n] }\n```\n- **Tự truyền**: `<Breadcrumb items={[{ title: 'Home', to: '/' }, { title: 'Chi tiết' }]} />`\n\n`PageHeader` đã dùng sẵn.",
      },
    },
  },
  args: {
    items: [{ title: 'Tổng quan', to: '/' }, { title: 'Bài viết', to: '/posts' }, { title: '#1' }],
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Manual: Story = {}
