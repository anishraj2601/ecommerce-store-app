"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { X } from "lucide-react"
import type { RootState } from "@/store"
import { removeToast } from "@/store/slices/uiSlice"

export function ToastProvider() {
  const dispatch = useDispatch()
  const toasts = useSelector((state: RootState) => state.ui.toasts)

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id))
      }, 5000)

      return () => clearTimeout(timer)
    })
  }, [toasts, dispatch])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg max-w-sm ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
                ? "bg-red-500 text-white"
                : toast.type === "warning"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
          }`}
        >
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => dispatch(removeToast(toast.id))} className="ml-3 flex-shrink-0 hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
