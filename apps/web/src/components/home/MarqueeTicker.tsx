"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { MarqueeItem } from '@next360/types/cms'
import Link from 'next/link'
import { cn } from '@next360/utils'

interface MarqueeTickerProps {
  items: MarqueeItem[]
}

export default function MarqueeTicker({ items }: MarqueeTickerProps) {
  if (!items || items.length === 0) return null

  // Quadruple items for a long enough infinite scroll line (matching gocart strategy)
  const doubledItems = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden w-full relative max-w-[1600px] mx-auto select-none group my-20 md:my-32 font-sans px-8">
      {/* Left Fade Overlay (Gocart High-Fidelity Style) */}
      <div className="absolute left-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
      
      <div className="flex w-fit no-scrollbar">
        <motion.div
           animate={{ x: [0, -1500] }}
           transition={{
             x: {
               repeat: Infinity,
               repeatType: "loop",
               duration: 60,
               ease: "linear",
             },
           }}
           className="flex items-center gap-6 py-4 group-hover:[animation-play-state:paused]"
        >
          {doubledItems.map((item, idx) => {
            const content = (
              <button 
                key={`${item.id}-${idx}`}
                className="px-10 py-4 bg-slate-50 rounded-full text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all duration-500 whitespace-nowrap shadow-sm border border-slate-100/50 italic group/marquee-item"
              >
                {item.emoji && <span className="mr-3 group-hover/marquee-item:animate-bounce inline-block">{item.emoji}</span>}
                {item.text}
              </button>
            )

            return item.link ? (
              <Link key={`${item.id}-link-${idx}`} href={item.link}>
                {content}
              </Link>
            ) : content
          })}
        </motion.div>
      </div>

      {/* Right Fade Overlay (Gocart High-Fidelity Style) */}
      <div className="absolute right-0 top-0 h-full w-40 z-10 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />
    </div>
  )
}
