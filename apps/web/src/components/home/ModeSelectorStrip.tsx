"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { PLATFORM_MODE_META, PlatformMode } from '@next360/types/location'
import { useModeStore } from '@/store/modeStore'
import { useLocationStore } from '@/store/locationStore'
import { cn } from '@next360/utils'

export default function ModeSelectorStrip() {
  const { activeMode, setMode } = useModeStore()
  const { enabledModes } = useLocationStore()
  
  // Hardcoded for development preview if enabledModes is empty
  const modes: PlatformMode[] = enabledModes.length > 0 
    ? enabledModes 
    : ['ORGANIC', 'NATURAL', 'ECO', 'RYTHU_BAZAR']

  return (
    <div className="w-full bg-[#f8f9fa] border-y border-slate-200/60 sticky top-[72px] z-40 shadow-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center min-h-[70px] gap-3 overflow-x-auto no-scrollbar py-3">
          
          <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mr-2 hidden lg:block">
            Platform Mode
          </span>

          {modes.map((mode) => {
            const config = PLATFORM_MODE_META[mode]
            const isActive = activeMode === mode

            return (
              <button
                key={mode}
                onClick={() => setMode(mode)}
                className={cn(
                  "relative flex items-center gap-3 px-8 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap group",
                  isActive 
                    ? "text-white font-bold" 
                    : "bg-white text-slate-500 hover:text-primary font-bold border border-slate-200/50 shadow-sm"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill-bg"
                    className="absolute inset-0 rounded-2xl shadow-lg shadow-primary/20"
                    style={{ backgroundColor: config.color }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                <span className={cn(
                  "text-xl transition-transform duration-300 relative z-10",
                  isActive ? "scale-110" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                )}>
                  {config.emoji}
                </span>
                
                <div className="flex flex-col items-start leading-none relative z-10 transition-colors">
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest font-black mb-1",
                    isActive ? "text-white/60" : "text-slate-400"
                  )}>
                    {mode.replace('_', ' ')}
                  </span>
                  <span className="text-sm">
                    {config.teluguLabel || config.label}
                  </span>
                </div>

                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white shadow-md z-20"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Subtle indicator line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
    </div>
  )
}
