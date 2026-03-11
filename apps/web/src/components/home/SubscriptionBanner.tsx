"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@next360/ui'
import { ArrowRight } from 'lucide-react'

const boxes = [
  { name: 'Veggie Box', price: '₹299', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', rotation: -6 },
  { name: 'Fruit Box', price: '₹399', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400', rotation: 4 },
  { name: 'Pantry Box', price: '₹599', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', rotation: -2 }
]

export default function SubscriptionBanner() {
  return (
    <section className="bg-primary rounded-[4rem] mx-4 sm:mx-10 my-20 overflow-hidden relative shadow-[0_50px_100px_rgba(22,163,74,0.15)] group font-sans">
      {/* Decorative High-Fidelity Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full -mr-64 -mt-64 animate-pulse duration-[5000ms]" />

      <div className="max-w-[1600px] mx-auto px-12 py-24 md:py-32 flex flex-col md:flex-row items-center gap-24 relative z-10">
        
        {/* Left Content */}
        <div className="flex-[1.2] text-white text-center md:text-left">
          <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
             <div className="h-1 w-12 bg-white/40 rounded-full" />
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/70 italic">Subscription Protocol</p>
          </div>
          <h2 className="font-black text-6xl md:text-8xl leading-[0.9] mb-10 tracking-tighter italic">
            Automated <br />
            <span className="text-white/60">Harvest Drops</span>
          </h2>
          <p className="text-white/80 text-xl font-bold italic opacity-90 max-w-lg mb-4 leading-relaxed underline underline-offset-8 decoration-white/10">
            Curated organic boxes delivered on your network schedule. Zero latency from farm to table.
          </p>
          <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mt-12">
            Base Yield: ₹299/sequence · Cancel Protocol Anytime
          </p>
          
          <div className="mt-14">
            <Link href="/subscribe">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-50 border-none font-black text-xs uppercase tracking-[0.4em] px-16 h-20 rounded-full shadow-2xl hover:scale-[1.05] active:scale-95 transition-all duration-500 group/sub-btn">
                <span className="flex items-center gap-4">
                  Initiate Sequence
                  <ArrowRight size={18} className="group-hover/sub-btn:translate-x-2 transition-transform" strokeWidth={3} />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Content — Floating Cards (Asset Visualization) */}
        <div className="flex-1 relative h-[450px] w-full max-w-[500px] hidden lg:block">
          {boxes.map((box, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: box.rotation }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="absolute bg-white rounded-[2.5rem] p-6 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-white/20 w-64 hover:scale-110 hover:-translate-y-4 hover:rotate-0 transition-all duration-700 cursor-pointer group/box"
              style={{ 
                zIndex: 30 - i,
                left: i * 60 + 'px',
                top: i * 40 + 'px'
              }}
            >
              <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-5 bg-slate-50 shadow-inner">
                <Image src={box.image} alt={box.name} fill className="object-cover group-hover/box:scale-115 transition-transform duration-1000" />
              </div>
              <p className="font-black text-slate-400 text-[9px] uppercase tracking-widest italic mb-1">Asset Class</p>
              <p className="font-black text-slate-900 text-xl tracking-tighter italic leading-none">{box.name}</p>
              <div className="flex items-center justify-between mt-6">
                 <p className="text-primary font-black text-sm tracking-widest italic">{box.price}</p>
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover/box:bg-primary group-hover/box:border-primary transition-colors">
                    <ArrowRight size={12} className="text-slate-300 group-hover/box:text-white" strokeWidth={3} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
