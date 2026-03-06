"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { m } from 'framer-motion'
import { ArrowRight, Leaf, ShieldCheck, Truck, RefreshCcw, FlaskConical, ChevronDown } from 'lucide-react'
import { Button } from '@next360/ui'

export default function HeroBanner() {
  const router = useRouter()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    })
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-cream flex items-center pt-20">
      {/* SVG Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20,50 Q40,40 50,20 Q60,40 80,50 Q60,60 50,80 Q40,60 20,50" fill="currentColor" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Col: Content */}
        <m.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <m.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-8 border border-secondary/20">
            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              🌱 Certified Organic · Trusted by 50K+ Families
            </span>
          </m.div>

          <m.div variants={item} className="space-y-1 mb-8">
            <h1 className="font-display text-6xl md:text-8xl text-primary font-bold leading-[1.1]">
              Pure Food.<br />
              Real Farmers.<br />
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Happy You.</span>
            </h1>
          </m.div>

          <m.p variants={item} className="text-slate-600 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-body">
            Sourced directly from certified organic farms across India. 
            No pesticides, no chemicals, no compromise on your health.
          </m.p>

          <m.div variants={item} className="flex flex-wrap gap-4 w-full sm:w-auto mb-12">
            <Button 
              size="lg" 
              className="rounded-full px-10 py-8 text-lg font-bold shadow-xl shadow-primary/20 group"
              onClick={() => router.push('/shop')}
            >
              Shop Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="rounded-full px-10 py-8 text-lg font-bold text-primary hover:bg-white"
              onClick={() => router.push('/about')}
            >
              Our Story
            </Button>
          </m.div>

          <m.div variants={item} className="grid grid-cols-2 sm:flex gap-6 pt-6 border-t border-slate-200 w-full">
            {[
              { icon: Leaf, text: 'No Pesticides' },
              { icon: Truck, text: 'Next-day Delivery' },
              { icon: RefreshCcw, text: 'Easy Returns' },
              { icon: FlaskConical, text: 'Lab Tested' }
            ].map((trust, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500">
                <trust.icon size={16} className="text-primary" />
                <span className="text-xs font-bold uppercase tracking-wide">{trust.text}</span>
              </div>
            ))}
          </m.div>
        </m.div>

        {/* Right Col: Image */}
        <m.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative aspect-square w-full max-w-2xl mx-auto lg:ml-auto"
        >
          <div className="absolute inset-0 bg-white shadow-2xl rounded-[40%_60%_60%_40%] overflow-hidden border-8 border-white/50 relative">
            <Image 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200"
              alt="Fresh Organic Produce"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
            {/* Floating Floating Leaf Decoration */}
            <m.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 w-20 h-20 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl rotate-12"
            >
              <Leaf className="text-primary" size={40} />
            </m.div>
          </div>
          
          {/* Experience Badge */}
          <m.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-20 -right-4 bg-accent text-white p-6 rounded-3xl shadow-2xl rotate-3"
          >
            <p className="text-4xl font-bold font-display">12+</p>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Local Farm<br />States</p>
          </m.div>
        </m.div>
      </div>

      {/* Scroll Indicator */}
      <m.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-3 bg-white shadow-xl rounded-full text-primary hover:text-accent transition-colors z-20 hidden md:flex"
      >
        <ChevronDown size={24} strokeWidth={3} />
      </m.button>
    </section>
  )
}
