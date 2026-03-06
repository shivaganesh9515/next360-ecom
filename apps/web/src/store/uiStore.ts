import { create } from 'zustand'

interface Toast {
  id:      string
  type:    'success' | 'error' | 'warning' | 'info'
  title:   string
  message?: string
}

interface UIStore {
  isPageLoading: boolean
  activeModal:   string | null
  toasts:        Toast[]

  setPageLoading: (loading: boolean) => void
  openModal:      (modalId: string) => void
  closeModal:     () => void
  addToast:       (toast: Omit<Toast, 'id'>) => void
  removeToast:    (id: string) => void
}

export const useUIStore = create<UIStore>()((set) => ({
  isPageLoading: false,
  activeModal:   null,
  toasts:        [],

  setPageLoading: (loading) => set({ isPageLoading: loading }),
  openModal:      (modalId) => set({ activeModal: modalId }),
  closeModal:     () => set({ activeModal: null }),

  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { ...toast, id: Date.now().toString() },
      ],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
