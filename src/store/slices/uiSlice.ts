import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type UiState = {
  sidebarCollapsed: boolean
}

const initialState: UiState = {
  sidebarCollapsed: false,
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
  },
  selectors: {
    selectSidebarCollapsed: (state) => state.sidebarCollapsed,
  },
})

export const { toggleSidebar, setSidebarCollapsed } = uiSlice.actions
export const { selectSidebarCollapsed } = uiSlice.selectors
