"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useModeStore } from '@/store/modeStore'
import { useLocationStore } from '@/store/locationStore'
import { PLATFORM_MODE_META, PlatformMode } from '@next360/types/location'
import { cn } from '@next360/utils'
import { MapPin, ChevronDown } from 'lucide-react'

export function ModeSelectorStrip() {
  const { activeMode, setMode } = useModeStore()
  const { city, enabledModes } = useLocationStore()

  if (!activeMode) return null

  return (
    <div className="bg-white border-b border-border sticky top-16 z-40 h-14 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center gap-3">
        
        <span className="text-[10px] text-muted uppercase tracking-[0.15em] font-black whitespace-nowrap hidden sm:block">
          Shopping as:
        </span>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {enabledModes.map((mode) => {
            const config = PLATFORM_MODE_META[mode]
            const isActive = activeMode === mode

            return (
              <button
                key={mode}
                onClick={() => setMode(mode)}
                className={cn(
                  "px-5 py-1.5 rounded-full text-sm font-bold font-sans flex items-center gap-2 border-2 whitespace-nowrap transition-all duration-200",
                  isActive 
                    ? "text-white shadow-sm" 
                    : "border-border text-muted hover:border-border/80 hover:text-text"
                )}
                style={isActive ? { backgroundColor: config.color, borderColor: config.color } : {}}
              >
                <span>{config.emoji}</span>
                <span>{config.label}</span>
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0 pl-4 border-l border-border h-8">
          <div className="flex items-center gap-1 cursor-pointer group text-muted hover:text-primary transition-colors">
            <MapPin size={14} className="text-secondary" />
            <span className="text-xs font-bold text-text">{city}</span>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>
    </div>
  )
}
