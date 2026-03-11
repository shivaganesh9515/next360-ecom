"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const CATEGORIES = [
  { name: 'Grains', icon: '🌾', slug: 'grains' },
  { name: 'Oils', icon: '🥥', slug: 'oils' },
  { name: 'Spices', icon: '🌿', slug: 'spices' },
  { name: 'Pulses', icon: '🫘', slug: 'pulses' },
  { name: 'Superfoods', icon: '🌱', slug: 'superfoods' },
  { name: 'Dairy', icon: '🧈', slug: 'dairy' },
  { name: 'Sweeteners', icon: '🍯', slug: 'sweeteners' },
]

export default function CategoryStrip() {
  return (
    <section className="bg-white py-20 border-b border-slate-50 overflow-hidden font-sans">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="h-1 w-6 bg-primary/30 rounded-full" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Registry Scope</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Global Collective</h2>
          </div>
          <Link href="/shop" className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group bg-slate-50 px-8 py-4 rounded-full border border-slate-100 hover:bg-primary/5 hover:text-primary hover:border-primary/20 hover:scale-[1.05] transition-all duration-500 shadow-sm active:scale-95">
            Identify All 
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </Link>
        </div>

        <div className="flex gap-12 overflow-x-auto no-scrollbar pb-8 -mx-8 px-8 cursor-grab active:cursor-grabbing">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="shrink-0"
            >
              <Link 
                href={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-5 group"
              >
                <div className="w-28 h-28 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-700 flex items-center justify-center text-5xl shadow-2xl shadow-slate-100 group-hover:shadow-primary/30 relative overflow-hidden group/token shadow-inner">
                  <span className="relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-700">{cat.icon}</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white/10 blur-xl rounded-full" />
                </div>
                <div className="text-center space-y-1">
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic leading-none group-hover:text-primary/50 transition-colors">Sector</p>
                   <p className="text-[11px] font-black text-slate-800 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">{cat.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
