'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PlatformMode, PLATFORM_MODE_META } from '@next360/types/location'

interface ModeState {
  activeMode: PlatformMode | null
  setMode: (mode: PlatformMode) => void
  getModeConfig: () => typeof PLATFORM_MODE_META[PlatformMode] | null
}

export const useModeStore = create<ModeState>()(
  persist(
    (set, get) => ({
      activeMode: null,

      setMode: (mode: PlatformMode) => set({ activeMode: mode }),

      getModeConfig: () => {
        const mode = get().activeMode
        return mode ? PLATFORM_MODE_META[mode] : null
      },
    }),
    {
      name: 'n360-mode'
    }
  )
)
