import { create } from 'zustand'

type AppStore = {
  isNavigationOpen: boolean
  setNavigationOpen: (isOpen: boolean) => void
}

/** Small UI-only store, ready for shared shell state when navigation is introduced. */
export const useAppStore = create<AppStore>((set) => ({
  isNavigationOpen: false,
  setNavigationOpen: (isNavigationOpen) => set({ isNavigationOpen }),
}))
