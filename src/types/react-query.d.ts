import '@tanstack/react-query'
import type { ApiError } from '@/services/api'

// `error` trong useQuery/useMutation có type ApiError thay vì Error
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError
  }
}
