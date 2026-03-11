"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import { PLATFORM_MODE_META, PlatformMode } from '@next360/types/location'
import { Button, Card } from '@next360/ui'
import { cn } from '@next360/utils'

export default function ModeSelectorModal() {
  const { city, deliveryPromise, enabledModes } = useLocationStore()
  const { activeMode, setMode } = useModeStore()
  const [selected, setSelected] = useState<PlatformMode | null>(activeMode)

  const modes: PlatformMode[] = ['ORGANIC', 'NATURAL', 'ECO', 'RYTHU_BAZAR']
  
  // Filter only enabled modes for this zone
  const availableModes = modes.filter(m => enabledModes.includes(m) || m === 'ORGANIC') // Organic always enabled as fallback

  const handleContinue = () => {
    if (selected) {
      setMode(selected)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center px-4 overflow-y-auto py-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full mx-auto"
      >
        <div className="text-center mb-10">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary font-medium text-sm mb-2"
          >
            ✓ Delivering to {city}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 text-xs mb-8"
          >
            {deliveryPromise || 'Fast delivery available'}
          </motion.p>

          <h2 className="font-display font-bold text-3xl mb-2">How do you like your food?</h2>
          <p className="text-white/60">Choose your shopping experience</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableModes.map((mode) => {
            const config = PLATFORM_MODE_META[mode]
            const isSelected = selected === mode

            return (
              <motion.div
                key={mode}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(mode)}
                className={cn(
                  'cursor-pointer rounded-2xl p-6 border-2 transition-all duration-200 text-left',
                  isSelected 
                    ? 'border-white bg-white/20' 
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                )}
              >
                <span className="text-4xl block mb-3">{config.emoji}</span>
                <h3 className="font-display font-bold text-xl mb-1">
                  {config.teluguLabel || config.label}
                </h3>
                <p className="text-white/60 text-sm leading-snug">{config.description}</p>
              </motion.div>
            )
          })}
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={handleContinue}
          disabled={!selected}
          className="mt-10 h-14 bg-white text-primary hover:bg-cream border-none font-bold text-lg rounded-2xl"
        >
          Continue →
        </Button>
      </motion.div>
    </div>
  )
}
