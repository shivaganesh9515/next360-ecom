"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon, ArrowRightIcon, Zap, Sparkles } from 'lucide-react'
import { Banner } from '@next360/types/cms'
import { Button } from '@next360/ui/Button'
import { cn } from '@next360/utils'

interface GocartHeroProps {
  banners: Banner[]
}

export default function GocartHero({ banners }: GocartHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currency = '₹' // Hardcoded for Next360 India focus

  // Side-scrolling logic
  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (!banners || banners.length === 0) return null

  const active = banners[currentIndex]

  // Mock data for side cards as per gocart reference
  const sideCards = [
    {
      title: 'Best Products',
      cta: 'View more',
      href: '/shop?sort=best-selling',
      bgColor: 'bg-orange-100',
      gradient: 'from-slate-800 to-[#FFAD51]',
      img: 'https://images.unsplash.com/photo-1615485290382-441e4d019cb5?w=500&auto=format&fit=crop'
    },
    {
      title: 'Seasonal Drops',
      cta: 'View more',
      href: '/shop?seasonal=true',
      bgColor: 'bg-blue-100',
      gradient: 'from-slate-800 to-[#78B2FF]',
      img: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop'
    }
  ]

  return (
    <div className='mx-6 font-sans'>
      <div className='flex max-xl:flex-col gap-10 max-w-[1600px] mx-auto my-12'>
        
        {/* MAIN CAROUSEL CARD (LEFT) - The "Primary Plate" */}
        <div className='relative flex-[1.4] flex flex-col bg-[#D8F3DC]/40 rounded-[3.5rem] xl:min-h-[580px] overflow-hidden group border border-primary/10 shadow-[0_50px_100px_rgba(22,163,74,0.08)]'>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(22,163,74,0.1),transparent)] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.02, x: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col sm:flex-row p-12 sm:p-20 z-10"
            >
              <div className="flex-1 flex flex-col justify-center text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='inline-flex items-center gap-4 bg-white/60 backdrop-blur-xl border border-primary/10 pr-6 p-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-primary w-fit mb-10 shadow-sm'
                >
                  <span className='bg-primary px-4 py-1.5 rounded-full text-white shadow-lg shadow-primary/20'>
                    {active.badgeText || 'PROTOCOL'}
                  </span> 
                  {active.subtitle || 'Fresh Registry Active'} 
                  <ChevronRightIcon className='group-hover:translate-x-1 transition-transform' size={14} strokeWidth={3} />
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='text-5xl sm:text-8xl leading-[0.9] font-black text-slate-900 tracking-tighter italic mb-8'
                >
                  {active.title.split(' ').map((word, i) => (
                    <span key={i} className={cn("block", i % 2 === 1 ? "text-primary ml-4" : "")}>
                       {word}
                    </span>
                  ))}
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className='flex items-center gap-6 mt-6'
                >
                  <div className="flex flex-col">
                    <p className="uppercase tracking-[0.4em] text-slate-400 text-[10px] font-black mb-2 italic">Yield Price</p>
                    <p className='text-6xl font-black text-slate-900 tracking-tighter italic'>{currency}{active.product?.price || '49'}</p>
                  </div>
                  <div className="h-12 w-px bg-slate-200 rotate-12 mx-4" />
                  <div className="space-y-1">
                     <p className='text-xs font-black text-primary uppercase tracking-widest'>Verified Organic</p>
                     <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 italic'>Direct from Source</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-14"
                >
                  <Link href={active.ctaLink}>
                    <Button className='bg-slate-900 text-white rounded-full py-8 px-16 text-xs uppercase tracking-[0.3em] font-black hover:bg-primary hover:scale-[1.05] active:scale-95 transition-all duration-500 shadow-2xl shadow-slate-900/20 group/btn border-none'>
                       <span className="flex items-center gap-3">
                        {active.ctaText}
                        <ArrowRightIcon className="group-hover/btn:translate-x-2 transition-transform" size={16} strokeWidth={3} />
                       </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Product/Banner Image Right */}
              <div className='relative flex-1 hidden sm:flex items-center justify-center pt-10'>
                 <motion.div
                   initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                   animate={{ scale: 1, opacity: 1, rotate: 0 }}
                   transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                   className="relative w-full aspect-square max-w-md"
                 >
                   <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full scale-110 animate-pulse" />
                   <Image 
                     className='object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative z-10 hover:scale-105 transition-transform duration-700' 
                     src={active.desktopImageUrl} 
                     alt={active.title}
                     fill
                     priority
                   />
                 </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Pagination Hooks */}
          <div className="absolute bottom-12 left-20 z-20 flex items-center gap-3">
             {banners.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setCurrentIndex(i)}
                 className={cn(
                   "h-2.5 rounded-full transition-all duration-700 border border-primary/20",
                   currentIndex === i ? "w-16 bg-primary shadow-lg shadow-primary/30" : "w-2.5 bg-white/50 hover:bg-primary/20"
                 )}
               />
             ))}
          </div>
        </div>

        {/* SIDE CARDS (RIGHT) - The "Utility Grid" */}
        <div className='flex flex-col md:flex-row xl:flex-col gap-8 w-full xl:max-w-sm'>
          {[
            {
              title: 'BEST COLLECTIVE',
              subtitle: 'Registry Trends',
              cta: 'Observe',
              href: '/shop?sort=best-selling',
              cardBg: 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50',
              accent: 'bg-orange-500',
              accentLight: 'bg-orange-50',
              img: 'https://images.unsplash.com/photo-1615485290382-441e4d019cb5?w=500&auto=format&fit=crop'
            },
            {
              title: 'SEASONAL BATCH',
              subtitle: 'Current Harvest',
              cta: 'Identify',
              href: '/shop?seasonal=true',
              cardBg: 'bg-slate-900 border-white/5 shadow-2xl shadow-black/20',
              accent: 'bg-primary',
              accentLight: 'bg-primary/10',
              img: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=500&auto=format&fit=crop',
              dark: true
            }
          ].map((card, idx) => (
            <Link key={idx} href={card.href} className={cn('flex-1 group flex flex-col justify-between w-full rounded-[3rem] p-10 transition-all hover:scale-[1.02] border duration-500 relative overflow-hidden', card.cardBg)}>
              {!card.dark && <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(245,158,11,0.05),transparent)] pointer-events-none" />}
              {card.dark && <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(22,163,74,0.05),transparent)] pointer-events-none" />}
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className={cn("w-1.5 h-6 rounded-full shadow-sm", card.accent)} />
                   <p className={cn('text-[10px] font-black uppercase tracking-[0.4em] italic', card.dark ? "text-slate-500" : "text-slate-400")}>{card.subtitle}</p>
                </div>
                <h3 className={cn('text-3xl font-black tracking-tighter italic mb-8 leading-none', card.dark ? "text-white" : "text-slate-900")}>
                  {card.title}
                </h3>
              </div>

              <div className="flex items-end justify-between relative z-10">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-500", card.dark ? "bg-white/5 border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20" : "bg-slate-50 border-slate-100 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:shadow-lg group-hover:shadow-orange-500/20")}>
                   <ArrowRightIcon className={cn("w-6 h-6 transition-colors duration-500", card.dark ? "text-slate-500 group-hover:text-white" : "text-slate-400 group-hover:text-white")} strokeWidth={3} />
                </div>
                <div className="relative w-40 aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700">
                  <Image className='object-cover' src={card.img} alt={card.title} fill />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
