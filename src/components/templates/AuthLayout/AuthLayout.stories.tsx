import type { Meta, StoryObj } from '@storybook/react-vite'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '@/components/organisms'
import { AuthLayout } from './AuthLayout'

const meta = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Khung trang đăng nhập / đăng ký: panel thương hiệu bên trái (ẩn trên mobile), form trong card bên phải, góc trên có đổi ngôn ngữ + theme. Dùng làm `element` cho route cha (bọc `GuestRoute`).',
      },
    },
  },
  render: () => (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="*" element={<LoginForm onSubmit={() => {}} />} />
      </Route>
    </Routes>
  ),
} satisfies Meta<typeof AuthLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
