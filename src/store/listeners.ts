import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '@/constants'
import { logout, setCredentials } from './slices/authSlice'

/** Side effect của client state (persist, analytics...) đặt ở đây, reducer giữ thuần. */
export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(setCredentials, logout),
  effect: (action) => {
    if (setCredentials.match(action)) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload.token)
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    }
  },
})
