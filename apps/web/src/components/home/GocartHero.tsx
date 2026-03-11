"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, Zap, Sparkles } from 'lucide-react'
import { Banner } from '@next360/types/cms'
import { Button } from '@next360/ui/Button'
import { GlassCard } from '@next360/ui/GlassCard'
import { cn } from '@next360/utils'

interface GocartHeroProps {
  banners: Banner[]
}

export default function GocartHero({ banners }: GocartHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (!banners || banners.length === 0) return null

  const active = banners[currentIndex]

  return (
    <div className='px-4 sm:px-10 py-10 font-sans max-w-[1700px] mx-auto overflow-hidden'>
      <div className='flex flex-col xl:flex-row gap-6 h-full xl:min-h-[700px]'>
        
        {/* MAIN SHOWCASE (2/3) */}
        <div className='relative flex-[2] rounded-[3.5rem] overflow-hidden group border border-cream-dark shadow-card min-h-[500px] sm:min-h-[600px] xl:min-h-0'>
          <GlassCard className="absolute inset-0 z-0 h-full w-full rounded-none border-none" tone="light">
            <div className="absolute inset-0 bg-cream-light/30" />
          </GlassCard>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/[0.05] blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/[0.03] blur-[100px] rounded-full" />
            <div className="absolute inset-0 bg-noise opacity-[0.01] pointer-events-none" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full h-full flex flex-col md:flex-row p-8 sm:p-16 md:p-20"
            >
              <div className="flex-1 flex flex-col justify-center text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cream border border-cream-dark text-[10px] font-black uppercase tracking-[0.3em] text-text mb-8 w-fit'
                >
                  <Sparkles size={14} className="text-accent animate-pulse" />
                  {active.badgeText || 'Elite Selection'}
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='text-5xl sm:text-7xl lg:text-9xl font-black text-text leading-[0.85] tracking-tight mb-8'
                >
                  {active.title.split(' ').map((word, i) => (
                    <span key={i} className={cn("block", i % 2 === 1 ? "text-primary font-light font-display italic" : "")}>
                       {word}
                    </span>
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted text-lg max-w-md font-medium mb-10 leading-relaxed"
                >
                  {active.description || "Discover the next evolution of curated quality. Precision sourced, elegantly delivered."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href={active.ctaLink}>
                    <Button className='bg-text text-cream-light rounded-full py-7 px-12 text-sm uppercase tracking-widest font-black hover:bg-primary hover:text-white active:scale-95 transition-all duration-500 shadow-card border-none group'>
                       <span className="flex items-center gap-3">
                        {active.ctaText}
                        <ArrowRightIcon className="group-hover:translate-x-2 transition-transform" size={18} />
                       </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <div className='flex-1 relative hidden md:flex items-center justify-center'>
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, rotate: 10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full aspect-square"
                >
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-white/50 to-transparent z-10" />
                  <Image 
                    className='object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.08)] z-0' 
                    src={active.desktopImageUrl} 
                    alt={active.title}
                    fill
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bars */}
          <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-auto z-20 flex gap-2">
            {banners.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className="h-1.5 w-12 rounded-full bg-slate-100 cursor-pointer overflow-hidden relative"
              >
                {currentIndex === i && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    className="absolute inset-0 bg-slate-900"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SIDE OFFERS (1/3) */}
        <div className='flex flex-col gap-6 flex-1'>
          
          <Link href="/shop/flash-sale" className="group relative flex-1">
            <GlassCard className="w-full h-full rounded-[3.5rem] p-10 flex flex-col justify-between" tone="light" hover>
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent/5 blur-[80px] rounded-full group-hover:bg-accent/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-accent rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Yield Protocol</span>
                </div>
                <h2 className="text-4xl font-black text-text tracking-tighter leading-none italic mb-2">
                  FLASH<br/>BATCH
                </h2>
                <p className="text-muted font-bold text-sm">Up to 40% Off Premium Reserves</p>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-cream-light border border-cream-dark flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
                  <ArrowRightIcon className="text-muted group-hover:text-cream-light transition-colors" size={24} />
                </div>
                <div className="relative w-32 aspect-square rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1615485290382-441e4d019cb5?w=500&auto=format&fit=crop" 
                    alt="Offer 1" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
            </GlassCard>
          </Link>

          <Link href="/collections/seasonal" className="group relative flex-1">
            <GlassCard className="w-full h-full rounded-[3.5rem] p-10 flex flex-col justify-between" tone="light" hover>
              <div className="absolute bottom-0 right-0 p-8">
                <Zap size={40} className="text-primary opacity-5 group-hover:opacity-20 transition-opacity" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-6 bg-primary/20 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Registry Sync</span>
                </div>
                <h2 className="text-4xl font-black text-text tracking-tighter leading-none italic mb-2">
                  SEASONAL<br/>DROPS
                </h2>
                <p className="text-muted font-bold text-sm">Identified: Fresh Collective 24</p>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-cream border border-cream-dark flex items-center justify-center group-hover:bg-text group-hover:border-text transition-all duration-500 shadow-sm">
                  <ArrowRightIcon className="text-muted group-hover:text-cream-light transition-colors" size={24} />
                </div>
                <div className="relative w-32 aspect-square -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                  <Image 
                    src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop" 
                    alt="Offer 2" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
            </GlassCard>
          </Link>

        </div>
      </div>
    </div>
  )
}
