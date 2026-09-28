import type { AuthUser } from '@/store'

export type LoginPayload = { email: string; password: string }
export type RegisterPayload = { name: string; email: string; password: string }
export type AuthResponse = { token: string; user: AuthUser }

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * MOCK — chưa có backend. Thay bằng API thật, ví dụ:
 *   login: (payload) => api.post<AuthResponse>('/auth/login', payload)
 */
export const authApi = {
  login: async ({ email }: LoginPayload): Promise<AuthResponse> => {
    await delay(600)
    if (email === 'fail@example.com') throw new Error('Sai email hoặc mật khẩu')
    const name = email.split('@')[0]
    return {
      token: `mock-token-${Date.now()}`,
      user: { id: 1, name, email, roles: email.startsWith('admin') ? ['admin'] : ['user'] },
    }
  },
  register: async ({ name, email }: RegisterPayload): Promise<AuthResponse> => {
    await delay(600)
    return { token: `mock-token-${Date.now()}`, user: { id: 2, name, email, roles: ['user'] } }
  },
}
