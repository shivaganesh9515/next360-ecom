"use client"

import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '500+', label: 'Network Partners' },
  { value: '50k+', label: 'Verified Nodes' },
  { value: '0.0', label: 'Molecular Latency' },
  { value: '100%', label: 'Protocol Integrity' }
]

export default function ImpactNumbers() {
  return (
    <section className="max-w-[1600px] mx-auto px-10 mb-20 font-sans">
      <div className="bg-primary rounded-[5rem] py-24 md:py-32 relative overflow-hidden shadow-[0_50px_100px_rgba(22,163,74,0.2)]">
        {/* Cinematic Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[150px] rounded-full animate-pulse duration-[8000ms]" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="font-black text-6xl md:text-8xl text-white mb-6 tracking-tighter italic leading-none group-hover:scale-110 transition-transform duration-700">
                  {stat.value}
                </div>
                <div className="h-1 w-8 bg-white/20 mx-auto mb-6 rounded-full group-hover:w-16 group-hover:bg-white/40 transition-all duration-700" />
                <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] italic">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
