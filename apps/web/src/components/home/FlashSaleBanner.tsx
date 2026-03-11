"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Timer } from 'lucide-react'
import { FlashSale } from '@next360/types/cms'
import { Button } from '@next360/ui/Button'
import Link from 'next/link'
import { cn } from '@next360/utils'

interface FlashSaleBannerProps {
  sale: FlashSale | null
}

export default function FlashSaleBanner({ sale }: FlashSaleBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hh: '00', mm: '00', ss: '00' })

  useEffect(() => {
    if (!sale?.endsAt) return

    const timer = setInterval(() => {
      const distance = new Date(sale.endsAt).getTime() - new Date().getTime()
      if (distance < 0) {
        clearInterval(timer)
        return
      }
      const hh = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const ss = Math.floor((distance % (1000 * 60)) / 1000)
      
      setTimeLeft({
        hh: String(hh).padStart(2, '0'),
        mm: String(mm).padStart(2, '0'),
        ss: String(ss).padStart(2, '0')
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [sale?.endsAt])

  if (!sale || !sale.isActive) return null

  return (
    <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-16 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[4rem] bg-accent text-white p-12 md:p-24 shadow-[0_50px_100px_rgba(245,158,11,0.15)] group border border-white/10"
      >
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_60px,white_60px,white_61px)]" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full animate-pulse duration-[7000ms]" />

        <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-16 md:gap-24">
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/20 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/20 shadow-xl italic">
              <Zap size={16} fill="currentColor" className="animate-pulse" strokeWidth={3} />
              Velocity Priority Live
            </div>
            
            <h2 className="font-black text-6xl md:text-8xl text-white leading-[0.85] tracking-tighter italic">
              {sale.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 0 ? '' : 'text-white/40'}>
                  {word}{' '}
                  {i === 0 && <br className="hidden md:block" />}
                </span>
              ))}
            </h2>
            
            <p className="text-white/80 font-bold italic text-xl max-w-xl leading-relaxed">
              Acquire premium yield at <span className="underline underline-offset-8 decoration-white/20">{sale.discountValue}% OFF</span>. High-fidelity verification protocol active until stock termination.
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 shrink-0">
            <div className="flex items-center gap-6">
              <TimeUnit value={timeLeft.hh} label="Phase" />
              <div className="text-4xl font-black text-white/20 self-start mt-4 animate-pulse">:</div>
              <TimeUnit value={timeLeft.mm} label="Sequence" />
              <div className="text-4xl font-black text-white/20 self-start mt-4 animate-pulse">:</div>
              <TimeUnit value={timeLeft.ss} label="Signal" />
            </div>

            <Link href="/shop/flash-sale">
              <Button size="lg" className="rounded-full bg-white text-accent hover:bg-slate-50 border-none font-black text-[12px] uppercase tracking-[0.4em] px-16 h-20 shadow-2xl hover:scale-[1.05] active:scale-95 transition-all duration-500 group/sale-btn">
                <span className="flex items-center gap-4">
                  Identify Yields
                  <ArrowRight className="group-hover/sale-btn:translate-x-2 transition-transform" strokeWidth={3} />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Background Icons (Registry Symbols) */}
        <motion.div 
           animate={{ rotate: 360, scale: [1, 1.1, 1] }}
           transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
           className="absolute -top-20 -right-20 opacity-[0.03] pointer-events-none"
        >
          <Timer size={500} className="text-white" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function TimeUnit({ value, label }: { value: string, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-20 h-20 flex items-center justify-center shadow-inner">
        <span className="text-4xl font-black font-mono tabular-nums leading-none">{value}</span>
      </div>
      <span className="text-[10px] uppercase font-black tracking-widest text-white/40 mt-3">{label}</span>
    </div>
  )
}
