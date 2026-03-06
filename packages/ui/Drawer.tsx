"use client"

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@next360/utils'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  position: 'right' | 'left' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
  title?: string
  children: React.ReactNode
}

export const Drawer = ({
  isOpen,
  onClose,
  position,
  size = 'md',
  title,
  children,
}: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (typeof window === 'undefined') return null

  const positions = {
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
      styles: 'right-0 top-0 h-full',
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
      styles: 'left-0 top-0 h-full',
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
      styles: 'bottom-0 left-0 w-full rounded-t-3xl',
    },
  }

  const sizes = {
    sm: position === 'bottom' ? 'max-h-[40vh]' : 'max-w-sm',
    md: position === 'bottom' ? 'max-h-[60vh]' : 'max-w-md',
    lg: position === 'bottom' ? 'max-h-[85vh]' : 'max-w-lg',
    full: position === 'bottom' ? 'h-full' : 'max-w-full',
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={positions[position].initial}
            animate={positions[position].animate}
            exit={positions[position].exit}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed bg-white z-[101] shadow-2xl flex flex-col',
              positions[position].styles,
              sizes[size],
              position !== 'bottom' && 'w-full'
            )}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              {title && <h3 className="text-xl font-display text-text">{title}</h3>}
              <button
                onClick={onClose}
                className="p-2 hover:bg-cream rounded-full transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-6 h-6 text-muted" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
