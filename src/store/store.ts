import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from './listeners'
import { authSlice } from './slices/authSlice'
import { uiSlice } from './slices/uiSlice'

const rootReducer = combineSlices(authSlice, uiSlice)

export type RootState = ReturnType<typeof rootReducer>

/** Factory để tạo store riêng cho test/Storybook. */
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault().prepend(listenerMiddleware.middleware),
    devTools: import.meta.env.DEV,
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
