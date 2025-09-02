"use client"

import type React from "react"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "../store"
import { ToastProvider } from "@/components/ui/ToastProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
        <ToastProvider />
      </PersistGate>
    </Provider>
  )
}
