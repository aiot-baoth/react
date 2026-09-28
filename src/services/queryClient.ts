import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      // Không retry lỗi 4xx (lỗi phía client), retry tối đa 2 lần với lỗi mạng/5xx
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status && error.status < 500) return false
        return failureCount < 2
      },
    },
    mutations: {
      retry: false,
    },
  },
})
