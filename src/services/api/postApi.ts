import { api } from './axiosClient'

/** Ví dụ resource — endpoint của JSONPlaceholder. Thay bằng API thật của dự án. */
export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export type CreatePostPayload = Omit<Post, 'id'>

export const postApi = {
  getList: (params?: { _limit?: number }) => api.get<Post[]>('/posts', { params }),
  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  create: (payload: CreatePostPayload) => api.post<Post>('/posts', payload),
  remove: (id: number) => api.delete<void>(`/posts/${id}`),
}
