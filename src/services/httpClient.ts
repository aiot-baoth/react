import { ENV } from '@/constants'

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown }

/** Wrapper tối giản quanh fetch. Thay bằng axios nếu cần interceptor phức tạp. */
export async function httpClient<T>(path: string, { body, headers, ...init }: RequestOptions = {}) {
  const res = await fetch(`${ENV.API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return (res.status === 204 ? undefined : await res.json()) as T
}
