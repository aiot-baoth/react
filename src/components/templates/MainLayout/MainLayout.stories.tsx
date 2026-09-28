import type { Meta, StoryObj } from '@storybook/react-vite'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './MainLayout'

const meta = {
  title: 'Templates/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Khung layout chính: **Header** cố định trên cùng + vùng nội dung (`<Outlet />`). Dùng làm `element` cho route cha.\n\n```tsx\ncreateBrowserRouter([\n  { element: <MainLayout />, children: [{ path: '/', Component: HomePage }] },\n])\n```",
      },
    },
  },
  render: () => (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <div className="grid h-64 place-items-center rounded-app border-2 border-dashed border-border text-text-secondary">
              Nội dung trang (Outlet)
            </div>
          }
        />
      </Route>
    </Routes>
  ),
} satisfies Meta<typeof MainLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
