"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@next360/ui'
import { ArrowRight } from 'lucide-react'

const boxTypes = [
  { label: '🥦 Veggie', price: '₹699/wk' },
  { label: '🍎 Fruit', price: '₹799/wk' },
  { label: '💪 Protein', price: '₹999/wk' },
  { label: '👨‍👩‍👧 Family', price: '₹1499/wk' }
]

export default function SubscriptionBanner() {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest">📦 Weekly Subscription</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Never Run Out of<br /> 
            <span className="text-accent underline decoration-accent/30 underline-offset-8 italic">Pure Organics</span>
          </h2>
          
          <p className="text-white/70 text-lg mb-10 max-w-xl leading-relaxed">
            Curated weekly boxes delivered directly from our farms to your door. Fresh, seasonal, and 100% certified organic essentials.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {boxTypes.map((box) => (
              <span 
                key={box.label}
                className="bg-white/5 border border-white/15 rounded-full px-5 py-2 text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-colors cursor-default"
              >
                {box.label} <span className="text-accent font-display">{box.price}</span>
              </span>
            ))}
          </div>

          <Link href="/subscribe">
            <Button variant="secondary" size="lg" className="rounded-full px-10 py-8 text-lg font-bold shadow-2xl group">
              Start My Weekly Box 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Right Illustration/Images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="mt-12"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" 
                  alt="Organic Box" 
                  fill 
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800" 
                  alt="Fresh Delivery" 
                  fill 
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white text-primary p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-border min-w-[280px]">
            <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-2xl">🚛</div>
            <div>
              <p className="font-bold leading-tight">Fast Farm Delivery</p>
              <p className="text-xs text-muted font-medium tracking-wide font-sans underline underline-offset-2 decoration-primary/20">HYDERABAD · BANGALORE · MUMBAI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
