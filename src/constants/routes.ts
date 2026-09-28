export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  POSTS: '/posts',
  POST_DETAIL: '/posts/:id',
  COMPONENTS: '/components',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
  NOT_FOUND: '*',
} as const

/** '/posts/:id' + { id: 1 } -> '/posts/1' */
export function buildPath(path: string, params: Record<string, string | number>) {
  return path.replace(/:(\w+)/g, (_, key: string) => String(params[key] ?? ''))
}
