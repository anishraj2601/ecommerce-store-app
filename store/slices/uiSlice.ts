import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
}

interface UIState {
  isLoading: boolean
  toasts: Toast[]
  mobileMenuOpen: boolean
}

const initialState: UIState = {
  isLoading: false,
  toasts: [],
  mobileMenuOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const toast: Toast = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.toasts.push(toast)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false
    },
  },
})

export const { setLoading, addToast, removeToast, toggleMobileMenu, closeMobileMenu } = uiSlice.actions
export default uiSlice.reducer
