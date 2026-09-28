import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '@/constants'
import { logout, setCredentials } from './slices/authSlice'
import { setThemeMode, toggleThemeMode } from './slices/uiSlice'
import type { RootState } from './store'

/** Side effect của client state (persist, analytics...) đặt ở đây, reducer giữ thuần. */
export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(setCredentials, logout),
  effect: (action) => {
    if (setCredentials.match(action)) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.token)
      if (action.payload.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload.user))
      }
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
    }
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(setThemeMode, toggleThemeMode),
  effect: (_action, api) => {
    const { themeMode } = (api.getState() as RootState).ui
    localStorage.setItem(STORAGE_KEYS.THEME_MODE, themeMode)
  },
})
