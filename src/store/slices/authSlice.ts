import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '@/constants'

export type AuthUser = {
  id: number | string
  name: string
  email: string
}

export type AuthState = {
  token: string | null
  user: AuthUser | null
}

const initialState: AuthState = {
  token: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user?: AuthUser }>) {
      state.token = action.payload.token
      state.user = action.payload.user ?? state.user
    },
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
    },
  },
  selectors: {
    selectToken: (state) => state.token,
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => Boolean(state.token),
  },
})

export const { setCredentials, setUser, logout } = authSlice.actions
export const { selectToken, selectUser, selectIsAuthenticated } = authSlice.selectors
