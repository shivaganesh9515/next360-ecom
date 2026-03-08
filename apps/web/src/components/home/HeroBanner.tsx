"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Leaf, ShieldCheck, Truck, RefreshCcw, FlaskConical, ChevronDown } from 'lucide-react'
import { Button } from '@next360/ui'
import { RevealText, MagneticButton, AnimatedGradientText, Meteors, ShimmerButton } from '@next360/ui'

// Three.js — dynamic import (no SSR)
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
})

const trustBadges = [
  { icon: ShieldCheck, text: 'No Pesticides' },
  { icon: FlaskConical, text: 'Lab Tested' },
  { icon: Truck, text: 'Next-Day Delivery' },
  { icon: RefreshCcw, text: 'Easy Returns' },
]

export default function HeroBanner() {
  const router = useRouter()
  const prefersReduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  }

  const item = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-transparent flex items-center pt-24">
      {/* Three.js Particle Scene — absolute, behind content */}
      {!prefersReduced && (
        <HeroScene particleCount={isMobile ? 60 : 120} />
      )}

      {/* SVG Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20,50 Q40,40 50,20 Q60,40 80,50 Q60,60 50,80 Q40,60 20,50" fill="#2d5016" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
      
      {!prefersReduced && <Meteors number={20} className="z-[2]" />}

      <div className="max-w-[1240px] mx-auto px-4 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Col: Content */}
        <motion.div
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? undefined : "hidden"}
          animate={prefersReduced ? undefined : "show"}
          className="flex flex-col items-start"
        >
          {/* Trust Badge */}
          <motion.div variants={item} className="mb-8">
            <AnimatedGradientText>
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Certified Organic · Trusted by 50K+ Families
                </span>
              </div>
            </AnimatedGradientText>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="space-y-1 mb-8">
            <h1 className="font-display text-5xl md:text-7xl xl:text-8xl text-primary font-semibold leading-[1.05]">
              Pure Food.<br />
              Real Farmers.<br />
              <span className="text-accent">Happy You.</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-muted font-sans text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Sourced directly from certified organic farms across India.{' '}
            No pesticides, no chemicals, no compromise on your health.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 w-full sm:w-auto mb-12">
            <MagneticButton
              strength={0.35}
              onClick={() => router.push('/shop')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-full text-base font-bold shadow-md hover:bg-primary/90 transition-colors focus-visible:outline-primary"
            >
              Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <ShimmerButton
              onClick={() => router.push('/about')}
              background="transparent"
              shimmerColor="#2d5016"
              className="text-primary border-border hover:bg-cream font-bold"
            >
              <Leaf size={18} className="mr-2" /> Our Story
            </ShimmerButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted font-sans font-medium">
                <Icon size={14} className="text-secondary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Col: Hero Image */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
          animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="hidden lg:flex relative items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-[520px]">
            {/* Blob background */}
            <div
              className="absolute inset-4 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-pulse-glow"
              style={{ background: 'radial-gradient(ellipse at center, rgba(76,175,125,0.15) 0%, transparent 70%)' }}
            />
            <div className="relative w-full h-full rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden border-4 border-cream shadow-[0_26px_80px_rgba(18,28,24,0.2)]">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                <span className="text-9xl select-none">🌿</span>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 -left-4 bg-surface shadow-[0_10px_26px_rgba(31,48,40,0.1)] rounded-2xl px-4 py-3 flex items-center gap-2.5 border border-border"
            >
              <span className="text-2xl">🌾</span>
              <div>
                <p className="text-xs font-black font-sans text-text uppercase tracking-wider">Local Farms</p>
                <p className="text-[10px] text-secondary font-bold">2,400+ States</p>
              </div>
            </motion.div>

            <motion.div
              animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-12 -right-4 bg-surface shadow-[0_10px_26px_rgba(31,48,40,0.1)] rounded-2xl px-4 py-3 flex items-center gap-2.5 border border-border"
            >
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-xs font-black font-sans text-text uppercase tracking-wider">4.9 Rating</p>
                <p className="text-[10px] text-muted font-bold font-sans">50K+ reviews</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!scrolled && !prefersReduced && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 2 }}
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full text-primary/60 hover:text-primary transition-colors"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={28} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}

