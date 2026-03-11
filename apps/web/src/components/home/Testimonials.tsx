"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Card, Avatar, Badge, RatingStars } from '@next360/ui'
import type { Testimonial } from '@next360/types/cms'
import { cn } from '@next360/utils'

export default function Testimonials({ items = [] }: { items?: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (items.length <= 3) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [items.length])

  if (items.length === 0) return null

  // For desktop we show 3 items, for mobile we show carousel
  const visibleItems = items.length <= 3 
    ? items 
    : [
        items[currentIndex], 
        items[(currentIndex + 1) % items.length], 
        items[(currentIndex + 2) % items.length]
      ]

  return (
    <section className="bg-slate-50/30 py-24 md:py-40 font-sans border-b border-slate-50">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="h-1 w-6 bg-primary/30 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Network Feedback</p>
          </div>
          <h2 className="font-black text-5xl md:text-8xl text-slate-900 tracking-tighter italic leading-none mb-8">
            Collective <span className="text-primary">Signals</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-bold italic opacity-60 leading-relaxed">
            High-fidelity verification from our global network of premium users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {visibleItems.map((item, idx) => (
            <motion.div
              key={item.id + idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="p-10 md:p-14 bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.03)] border border-slate-100 relative overflow-hidden h-full flex flex-col hover:shadow-[0_50px_100px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-700">
                <span className="absolute -top-4 -right-2 text-[10rem] text-primary/5 font-black leading-none select-none pointer-events-none italic opacity-50">"</span>
                
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="flex items-center gap-4">
                    <Avatar src={item.avatarUrl || undefined} name={item.name} size="sm" className="rounded-2xl border-2 border-primary/10 shadow-sm" />
                    <div>
                      <p className="font-black text-slate-900 text-sm leading-none italic underline underline-offset-4 decoration-primary/20">{item.name}</p>
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-2 opacity-60">{item.city}</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">Verified Node</Badge>
                </div>

                <div className="flex items-center gap-1 text-primary mb-8 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={item.rating > i ? 'currentColor' : 'none'} className={item.rating > i ? '' : 'text-slate-200'} strokeWidth={3} />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-slate-900 leading-relaxed font-bold italic flex-1 relative z-10 opacity-90 mb-10">
                  "{item.text}"
                </p>

                {item.product && (
                  <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                       <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] italic">{item.product.name}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary group-hover:border-primary transition-colors">
                       <Quote size={12} className="text-slate-200 group-hover:text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
