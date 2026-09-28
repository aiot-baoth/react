import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { postApi, type CreatePostPayload } from '@/services/api'

/** Query key factory: gom key 1 chỗ, dễ invalidate theo cấp. */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params?: { _limit?: number }) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
}

/** queryOptions dùng lại được cho useQuery, prefetchQuery, ensureQueryData (router loader). */
export const postQueries = {
  list: (params?: { _limit?: number }) =>
    queryOptions({ queryKey: postKeys.list(params), queryFn: () => postApi.getList(params) }),
  detail: (id: number) =>
    queryOptions({ queryKey: postKeys.detail(id), queryFn: () => postApi.getById(id) }),
}

export function usePosts(params?: { _limit?: number }) {
  return useQuery(postQueries.list(params))
}

export function usePost(id: number) {
  return useQuery({ ...postQueries.detail(id), enabled: id > 0 })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => postApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: postKeys.lists() }),
  })
}
