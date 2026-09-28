import { useState } from 'react'

export type NotificationItem = {
  id: string
  title: string
  description?: string
  /** ISO date string */
  createdAt: string
  read: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
}

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString()

const MOCK: NotificationItem[] = [
  {
    id: '1',
    title: 'Đơn hàng #1024 đã được thanh toán',
    createdAt: minutesAgo(3),
    read: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Bài viết của bạn có 5 bình luận mới',
    description: 'Hướng dẫn Atomic Design',
    createdAt: minutesAgo(45),
    read: false,
    type: 'info',
  },
  {
    id: '3',
    title: 'Dung lượng lưu trữ sắp đầy (90%)',
    createdAt: minutesAgo(60 * 5),
    read: false,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Đăng nhập từ thiết bị mới',
    description: 'Chrome trên macOS',
    createdAt: minutesAgo(60 * 26),
    read: true,
    type: 'info',
  },
]

/**
 * MOCK — dữ liệu thông báo mẫu, lưu trong state.
 * Thay bằng TanStack Query (useQuery + useMutation) khi có API thật.
 */
export function useNotifications() {
  const [items, setItems] = useState(MOCK)

  return {
    items,
    unreadCount: items.filter((n) => !n.read).length,
    markRead: (id: string) =>
      setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n))),
    markAllRead: () => setItems((list) => list.map((n) => ({ ...n, read: true }))),
  }
}
