import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '@/constants'
import type { ThemeMode } from '@/theme'

export type UiState = {
  sidebarCollapsed: boolean
  themeMode: ThemeMode
}

function getInitialThemeMode(): ThemeMode {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME_MODE)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialState: UiState = {
  sidebarCollapsed: false,
  themeMode: getInitialThemeMode(),
}

/** Client state thuần UI (không liên quan dữ liệu server). */
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload
    },
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload
    },
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark'
    },
  },
  selectors: {
    selectSidebarCollapsed: (state) => state.sidebarCollapsed,
    selectThemeMode: (state) => state.themeMode,
  },
})

export const { toggleSidebar, setSidebarCollapsed, setThemeMode, toggleThemeMode } = uiSlice.actions
export const { selectSidebarCollapsed, selectThemeMode } = uiSlice.selectors
