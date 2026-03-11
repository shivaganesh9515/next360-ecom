"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { storefrontService } from '@/services/storefrontService'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import Link from 'next/link'

export default function AnnouncementBar() {
  const { zoneId } = useLocationStore()
  const { activeMode } = useModeStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const { data: storefront } = useQuery({
    queryKey: ['storefront', zoneId, activeMode],
    queryFn: () => storefrontService.getStorefrontData(zoneId || 'zone-hyd', activeMode || 'ORGANIC'),
    enabled: !!zoneId && !!activeMode
  })

  const announcement = storefront?.announcements?.[0]
  const messages = announcement?.messages || []

  useEffect(() => {
    if (messages.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, (announcement?.rotateEvery || 4) * 1000)

    return () => clearInterval(interval)
  }, [messages.length, announcement?.rotateEvery])

  if (!isVisible || messages.length === 0 || !announcement?.isActive) return null

  return (
    <div 
      className="h-9 relative overflow-hidden z-[60]"
      style={{ backgroundColor: announcement.bgColor, color: announcement.textColor }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center justify-center gap-2 text-sm font-sans font-medium"
          >
            <span>{messages[currentIndex].text}</span>
            {messages[currentIndex].link && (
              <Link 
                href={messages[currentIndex].link!} 
                className="underline hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                Learn more <ArrowRight size={12} />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  )
}
