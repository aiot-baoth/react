import { api, axiosClient } from './axiosClient'

/** Ví dụ resource — endpoint của JSONPlaceholder. Thay bằng API thật của dự án. */
export type Post = {
  id: number
  userId: number
  title: string
  body: string
}

export type Comment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export type CreatePostPayload = Omit<Post, 'id'>
export type UpdatePostPayload = Partial<CreatePostPayload>

/** Tham số danh sách dùng chung cho mọi màn list (phân trang + sort + lọc) */
export type ListParams = {
  page: number
  pageSize: number
  sort?: string
  order?: 'asc' | 'desc'
}

export type PostListParams = ListParams & {
  q?: string
  userId?: number
}

export type Paginated<T> = { items: T[]; total: number }

export const postApi = {
  getList: (params?: { _limit?: number }) => api.get<Post[]>('/posts', { params }),

  /** Phân trang phía server; tổng số bản ghi lấy từ header `x-total-count` (json-server) */
  getPage: async ({ page, pageSize, sort, order, q, userId }: PostListParams) => {
    const res = await axiosClient.get<Post[]>('/posts', {
      params: {
        _page: page,
        _limit: pageSize,
        _sort: sort,
        _order: order,
        q: q || undefined,
        userId,
      },
    })
    return {
      items: res.data,
      total: Number(res.headers['x-total-count'] ?? res.data.length),
    } satisfies Paginated<Post>
  },

  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  getComments: (id: number) => api.get<Comment[]>(`/posts/${id}/comments`),
  create: (payload: CreatePostPayload) => api.post<Post>('/posts', payload),
  update: (id: number, payload: UpdatePostPayload) => api.patch<Post>(`/posts/${id}`, payload),
  remove: (id: number) => api.delete<void>(`/posts/${id}`),
}
