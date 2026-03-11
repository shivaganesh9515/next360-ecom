"use client"

import React, { useEffect, useState } from 'react'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import { usePathname } from 'next/navigation'
import LocationPickerModal from './LocationPickerModal'
import ModeSelectorModal from './ModeSelectorModal'

interface LocationGateProps {
  children: React.ReactNode
}

export function LocationGate({ children }: LocationGateProps) {
  const pathname = usePathname()
  const { isLocationSet } = useLocationStore()
  const { activeMode } = useModeStore()
  const [mounted, setMounted] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Paths that don't require location/mode selection
  const isPublicRoute = pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/logout')
  
  if (isPublicRoute) {
    return <>{children}</>
  }

  const isLocked = (!isLocationSet || !activeMode) && !isDismissed

  return (
    <>
      <div className={isLocked ? 'blur-md pointer-events-none transition-all duration-500' : 'transition-all duration-500'}>
        {children}
      </div>

      {!isLocationSet && !isDismissed && (
        <LocationPickerModal isOpen={true} onClose={() => setIsDismissed(true)} />
      )}

      {isLocationSet && !activeMode && !isDismissed && (
        <ModeSelectorModal />
      )}

      {/* Floating reminder if dismissed but not set */}
      {(!isLocationSet || !activeMode) && isDismissed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]">
          <button 
            onClick={() => setIsDismissed(false)}
            className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform border border-white/20"
          >
            📍 Set Location for Better Experience
          </button>
        </div>
      )}
    </>
  )
}
