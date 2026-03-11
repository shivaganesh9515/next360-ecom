import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useModeStore = create(
  persist(
    (set, get) => ({
      activeMode: 'ORGANIC',
      hasSelectedMode: false,

      setMode: (mode) => set({ activeMode: mode, hasSelectedMode: true }),

      getModeConfig: () => {
        const mode = get().activeMode
        const configs = {
          ORGANIC: { label: 'Organic', emoji: '🌿', color: '#2D5016', desc: 'NPOP Verified' },
          NATURAL: { label: 'Natural', emoji: '🌱', color: '#4A7C59', desc: 'Chemical Free' },
          ECO: { label: 'Eco Friendly', emoji: '♻️', color: '#1B6CA8', desc: 'Sustainable Packaging' },
          RYTHU_BAZAR: { label: 'రైతు బజార్', emoji: '🏪', color: '#C0392B', desc: 'Direct from Farmer' },
        }
        return configs[mode] || configs.ORGANIC
      }
    }),
    {
      name: 'n360-mode'
    }
  )
)
