import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  postApi,
  type CreatePostPayload,
  type PostListParams,
  type UpdatePostPayload,
} from '@/services/api'

/** Query key factory: gom key 1 chỗ, dễ invalidate theo cấp. */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: { _limit?: number }) => [...postKeys.lists(), params] as const,
  page: (params: PostListParams) => [...postKeys.lists(), 'page', params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
  comments: (id: number) => [...postKeys.detail(id), 'comments'] as const,
}

/** queryOptions dùng lại được cho useQuery, prefetchQuery, ensureQueryData (router loader). */
export const postQueries = {
  list: (params?: { _limit?: number }) =>
    queryOptions({ queryKey: postKeys.list(params), queryFn: () => postApi.getList(params) }),
  page: (params: PostListParams) =>
    queryOptions({
      queryKey: postKeys.page(params),
      queryFn: () => postApi.getPage(params),
      placeholderData: keepPreviousData, // Giữ dữ liệu trang cũ khi chuyển trang -> không nháy
    }),
  detail: (id: number) =>
    queryOptions({ queryKey: postKeys.detail(id), queryFn: () => postApi.getById(id) }),
  comments: (id: number) =>
    queryOptions({ queryKey: postKeys.comments(id), queryFn: () => postApi.getComments(id) }),
}

export function usePosts(params?: { _limit?: number }) {
  return useQuery(postQueries.list(params))
}

export function usePostPage(params: PostListParams) {
  return useQuery(postQueries.page(params))
}

export function usePost(id: number) {
  return useQuery({ ...postQueries.detail(id), enabled: id > 0 })
}

export function usePostComments(id: number) {
  return useQuery({ ...postQueries.comments(id), enabled: id > 0 })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: postKeys.lists() }),
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...payload }: UpdatePostPayload & { id: number }) =>
      postApi.update(id, payload),
    onSuccess: (post) => {
      queryClient.setQueryData(postKeys.detail(post.id), post)
      return queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => postApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: postKeys.lists() }),
  })
}
