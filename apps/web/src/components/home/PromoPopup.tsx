"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { PromoPopup as PromoPopupData } from '@next360/types/cms'
import { Button } from '@next360/ui'
import Link from 'next/link'
import { toast } from 'sonner'

const STORAGE_KEY = 'next360-popup-shown'

export default function PromoPopup({ popup }: { popup: PromoPopupData | null }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!popup || !popup.isActive) return

    const shown = localStorage.getItem(`${STORAGE_KEY}-${popup.id}`)
    if (popup.showOnce && shown) return

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, (popup.delaySeconds || 5) * 1000)

    return () => clearTimeout(timer)
  }, [popup])

  if (!popup || !isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    if (popup.showOnce) {
      localStorage.setItem(`${STORAGE_KEY}-${popup.id}`, 'true')
    }
  }

  const copyCode = () => {
    if (popup.couponCode) {
      navigator.clipboard.writeText(popup.couponCode)
      toast.success('Code copied to clipboard!')
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 100, scale: 0.9, rotateX: 20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative bg-white rounded-[4rem] shadow-[0_100px_150px_rgba(0,0,0,0.15)] max-w-sm w-full overflow-hidden flex flex-col border border-slate-100"
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 z-20 transition-all border border-white/20 active:scale-95 group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-500" strokeWidth={3} />
        </button>

        {popup.imageUrl && (
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src={popup.imageUrl} alt={popup.title} fill className="object-cover hover:scale-110 transition-transform duration-[2000ms]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </div>
        )}

        <div className="p-10 pt-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-1 w-4 bg-primary/20 rounded-full" />
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary italic">Priority Sequence</p>
          </div>
          
          <h2 className="font-black text-4xl text-slate-900 mb-4 tracking-tighter italic leading-none">{popup.title}</h2>
          <p className="text-slate-400 font-bold italic text-[13px] mb-8 leading-relaxed opacity-70 px-4">{popup.description}</p>

          {popup.couponCode && (
            <div className="mb-8">
              <div 
                onClick={copyCode}
                className="bg-slate-50 border-2 border-dashed border-primary/20 rounded-[2rem] py-5 px-6 font-black text-primary text-3xl tracking-[0.3em] cursor-pointer hover:bg-primary/5 transition-all relative group overflow-hidden italic"
              >
                {popup.couponCode}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-primary/5 backdrop-blur-[2px]">
                  <span className="bg-primary text-white text-[9px] px-4 py-2 rounded-full font-black uppercase tracking-[0.3em] shadow-xl">Identity Verified</span>
                </div>
              </div>
            </div>
          )}

          <Link href={popup.ctaLink || '/shop'} onClick={handleClose}>
            <Button fullWidth size="lg" className="h-16 rounded-full font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-primary/20 bg-primary text-white border-none hover:scale-[1.03] active:scale-95 transition-all duration-500">
              {popup.ctaText}
            </Button>
          </Link>

          <button 
            onClick={handleClose}
            className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em] mt-8 hover:text-primary italic transition-colors"
          >
            Decline Registry Access
          </button>
        </div>
      </motion.div>
    </div>
  )
}
