"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'

export default function TodaysHarvest() {
  const [timeLeft, setTimeLeft] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  
  const { data: trendingProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'trending'],
    queryFn: productService.getTrending,
    staleTime: 5 * 60 * 1000,
  })

  const harvestItems = trendingProducts.slice(0, 3)

  useEffect(() => {
    if (prefersReduced || harvestItems.length === 0) return

    let gsapCtx: any;
    const initGsap = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      
      gsapCtx = gsap.context(() => {
        gsap.fromTo(".harvest-card", 
          { y: 40, opacity: 0 },
          { 
             y: 0, 
             opacity: 1, 
             duration: 0.6,
             stagger: 0.1,
             ease: "power2.out",
             scrollTrigger: {
               trigger: containerRef.current,
               start: "top bottom-=10%",
             }
          }
        )
      }, containerRef)
    }
    initGsap()
    
    return () => gsapCtx?.revert()
  }, [harvestItems.length, prefersReduced])

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
    <div ref={containerRef} className="bg-surface text-text overflow-hidden whitespace-nowrap border-y border-border py-2">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex items-center justify-between h-12">
        {/* Left: Label */}
        <div className="flex items-center gap-2 shrink-0 pr-6 border-r border-border">
          <span className="text-xl">🌾</span>
          <span className="uppercase text-[10px] font-bold tracking-[0.2em]">Today's Fresh Harvest</span>
        </div>

        {/* Center: Marquee-like items (or fixed if space permits) */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide px-6 w-full max-w-3xl">
          {isLoading ? (
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted animate-pulse">
              Syncing with farm...
            </div>
          ) : harvestItems.map((product) => (
            <m.div 
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="harvest-card flex items-center gap-3 bg-cream rounded-full px-4 py-1.5 border border-border group cursor-default shadow-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold font-sans text-text">{product.name}</span>
              <span className="text-[10px] bg-secondary/15 text-secondary-dark font-bold px-1.5 rounded uppercase">
                {product.stock} Left
              </span>
            </m.div>
          ))}
        </div>

        {/* Right: Timer & Link */}
        <div className="flex items-center gap-6 shrink-0 pl-6 border-l border-border">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-accent fill-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Batch closes in</span>
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


