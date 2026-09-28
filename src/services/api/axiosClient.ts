import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { ENV } from '@/constants'
import { logout, store } from '@/store'

/** Lỗi API đã chuẩn hoá — mọi nơi (TanStack Query, UI) chỉ cần xử lý 1 kiểu. */
export class ApiError extends Error {
  readonly status?: number
  readonly data?: unknown

  constructor(message: string, status?: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const axiosClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

// Gắn access token từ Redux store
axiosClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Chuẩn hoá lỗi + tự logout khi 401
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status
    if (status === 401) store.dispatch(logout())

    const message = error.response?.data?.message ?? error.message ?? 'Đã có lỗi xảy ra'
    return Promise.reject(new ApiError(message, status, error.response?.data))
  },
)

/** Helper trả thẳng `data` thay vì AxiosResponse. */
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosClient.get<T>(url, config).then((res) => res.data),
  post: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    axiosClient.post<T>(url, body, config).then((res) => res.data),
  put: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    axiosClient.put<T>(url, body, config).then((res) => res.data),
  patch: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    axiosClient.patch<T>(url, body, config).then((res) => res.data),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosClient.delete<T>(url, config).then((res) => res.data),
}
