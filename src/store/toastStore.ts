import { create } from 'zustand'

export type ToastType = 'success' | 'error'
type ToastConstType = 'SUCCESS' | 'ERROR'
export const TOAST_TYPE: Record<ToastConstType, ToastType> = {
  SUCCESS: 'success',
  ERROR: 'error',
}
interface ToastState {
  isOpen: boolean
  type: ToastType
  message: string
  timeout: number
  actions: ToastActions
}

interface ToastActions {
  toastShow: (type: ToastType, message: string, timeout?: number) => void
  toastHide: () => void
}

let timer: ReturnType<typeof setTimeout> | null = null

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  type: 'success',
  message: '',
  timeout: 3000,

  actions: {
    toastShow: (type, message, timeout = 3000) => {
      if (timer) clearTimeout(timer)

      set({
        isOpen: true,
        type,
        message,
        timeout,
      })

      timer = setTimeout(() => {
        set({ isOpen: false })
      }, timeout)
    },

    toastHide: () => {
      if (timer) clearTimeout(timer)
      set({ isOpen: false })
    },
  },
}))

export const useToastActions = () => useToastStore((state) => state.actions)
