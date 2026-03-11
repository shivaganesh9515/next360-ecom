"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { Banner, FlashSale } from '@next360/types/cms'
import { Button } from '@next360/ui/Button'
import { cn, formatPrice } from '@next360/utils'
import { useCartStore } from '@/store/cartStore'
import { useLocationStore } from '@/store/locationStore'

interface HeroCarouselProps {
  banners: Banner[]
  flashSale?: FlashSale | null
}

export default function HeroCarousel({ banners, flashSale }: HeroCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0])
  const [timeLeft, setTimeLeft] = useState({ hh: '00', mm: '00', ss: '00' })
  const { addItem, openDrawer } = useCartStore()
  const { deliveryPromise } = useLocationStore()
  
  const currentIndex = Math.abs(page % banners.length)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  // Auto-paginate
  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => paginate(1), 6000)
    return () => clearInterval(timer)
  }, [page, banners.length])

  // Flash Sale Timer logic
  useEffect(() => {
    if (!flashSale?.endsAt) return
    const timer = setInterval(() => {
      const distance = new Date(flashSale.endsAt).getTime() - new Date().getTime()
      if (distance < 0) {
        clearInterval(timer)
        return
      }
      const hh = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const ss = Math.floor((distance % (1000 * 60)) / 1000)
      setTimeLeft({ hh: String(hh).padStart(2, '0'), mm: String(mm).padStart(2, '0'), ss: String(ss).padStart(2, '0') })
    }, 1000)
    return () => clearInterval(timer)
  }, [flashSale?.endsAt])

  if (banners.length === 0) return null

  const active = banners[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section className="relative min-h-[550px] md:min-h-[650px] overflow-hidden bg-[#1b4332] text-white pt-10 pb-16 md:pb-24">
      {/* Animated glow orbs (Gocart UI) */}
      <motion.div
        className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[#52b788]/20 blur-[100px] pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#d8f3dc]/10 blur-[80px] pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="relative h-full flex items-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center"
            >
              {/* CONTENT LEFT */}
              <div className="flex flex-col items-start text-left space-y-6">
                {active.badgeText && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold"
                  >
                    <Sparkles size={14} className="text-[#95d5b2]" />
                    {active.badgeText}
                  </motion.div>
                )}

                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white drop-shadow-sm">
                  {active.title}
                </h1>

                {active.description && (
                  <p className="max-w-md text-[#b7e4c7] text-base md:text-lg leading-relaxed font-medium">
                    {active.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Link href={active.ctaLink}>
                    <Button size="lg" className="h-14 px-10 rounded-full bg-[#52b788] text-[#1b4332] hover:bg-[#95d5b2] border-none font-bold text-lg group shadow-xl">
                      {active.ctaText}
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  {active.product && (
                    <button 
                      onClick={() => {
                         addItem(active.product!, 1, active.product!.weight?.[0] || '1unit')
                         openDrawer()
                      }}
                      className="inline-flex items-center rounded-full border border-white/35 px-6 py-4 text-sm font-bold hover:bg-white/10 transition-colors duration-300"
                    >
                      Our Farms
                    </button>
                  )}
                </div>

                {/* Pricing / Offer Info */}
                <div className="inline-flex items-end gap-6 rounded-3xl bg-white/10 border border-white/25 px-6 py-4 mt-4">
                   <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#b7e4c7] font-bold">Starting at</p>
                      <p className="text-3xl font-black text-[#95d5b2]">₹{active.product?.price || '49'}</p>
                   </div>
                   <p className="text-sm text-[#b7e4c7]/80 pb-1 max-w-[150px] leading-tight line-clamp-2">
                     Organic boxes, bundles & seasonal picks.
                   </p>
                </div>
              </div>

              {/* IMAGE RIGHT (Product/Banner Floating Image) */}
              <div className="hidden md:block relative h-[500px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative h-full w-full flex items-center justify-center"
                >
                  <motion.div
                     animate={{ y: [0, -15, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                     className="relative aspect-[3/4] w-full max-w-[380px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-4 border-white/10"
                  >
                    <Image 
                      src={active.desktopImageUrl} 
                      alt={active.title} 
                      fill 
                      className="object-cover" 
                      priority 
                    />
                  </motion.div>

                  {/* Smaller accent card if product exists */}
                  {active.product && (
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      className="absolute bottom-10 -right-4 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white w-48 text-text"
                    >
                      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 border border-black/5">
                        <Image src={active.product.images[0]} alt={active.product.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-bold text-sm leading-tight mb-1">{active.product.name}</h3>
                      <p className="text-primary font-black text-lg">{formatPrice(active.product.price)}</p>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
        <button 
          onClick={() => paginate(-1)}
          className="size-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex gap-2.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > currentIndex ? 1 : -1])}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                currentIndex === i ? "w-10 bg-[#52b788] shadow-[0_0_15px_rgba(82,183,136,0.5)]" : "w-2 bg-white/30"
              )}
            />
          ))}
        </div>

        <button 
          onClick={() => paginate(1)}
          className="size-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Index Counter */}
      <div className="absolute top-10 right-10 z-20 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/70 text-xs font-mono font-bold tracking-widest">
          <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2 opacity-30">/</span>
          <span>{String(banners.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}
