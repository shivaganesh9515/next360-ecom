"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'

export default function TodaysHarvest() {
  const [timeLeft, setTimeLeft] = useState('')
  
  const { data: trendingProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: productService.getTrending,
    staleTime: 5 * 60 * 1000,
  })

  const harvestItems = trendingProducts.slice(0, 3)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const diff = midnight.getTime() - now.getTime()
      
      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-primary text-white overflow-hidden whitespace-nowrap border-y border-white/10 py-1">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        {/* Left: Label */}
        <div className="flex items-center gap-2 shrink-0 pr-6 border-r border-white/20">
          <span className="text-xl">🌾</span>
          <span className="uppercase text-[10px] font-bold tracking-[0.2em]">Today's Fresh Harvest</span>
        </div>

        {/* Center: Marquee-like items (or fixed if space permits) */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide px-6">
          {isLoading ? (
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 animate-pulse">
              Syncing with farm...
            </div>
          ) : harvestItems.map((product) => (
            <m.div 
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-1.5 border border-white/10 group cursor-default"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold">{product.name}</span>
              <span className="text-[10px] bg-accent/20 text-accent font-bold px-1.5 rounded uppercase">
                {product.stock} Left
              </span>
            </m.div>
          ))}
        </div>

        {/* Right: Timer & Link */}
        <div className="flex items-center gap-6 shrink-0 pl-6 border-l border-white/20">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-accent fill-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Batch closes in</span>
            <span className="font-mono text-base font-bold text-accent tracking-tighter w-20">{timeLeft}</span>
          </div>

          <Link 
            href="/shop?tag=today" 
            className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
          >
            Shop Batch 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
