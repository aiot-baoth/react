import { useMutation } from '@tanstack/react-query'
import { authApi, type LoginPayload, type RegisterPayload } from '@/services/api'
import { setCredentials, useAppDispatch } from '@/store'

/** Đăng nhập: gọi API rồi lưu token + user vào Redux. */
export function useLogin() {
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (res) => dispatch(setCredentials(res)),
  })
}

export function useRegister() {
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (res) => dispatch(setCredentials(res)),
  })
}
