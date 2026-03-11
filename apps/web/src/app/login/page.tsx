'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import LoginForm from '@/components/auth/LoginForm'
import GoogleAuthButton from './GoogleAuthButton'
import { GlassCard } from '@next360/ui/GlassCard'

const benefits = [
  "100% Certified Organic Produce",
  "Directly sourced from 500+ Indian farmers",
  "Zero chemical pesticides or synthetic fertilizers"
]

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex overflow-hidden font-sans">
      {/* LEFT: Branding/Visual (Hidden on mobile) */}
      <div className="hidden lg:flex w-[48%] bg-primary relative flex-col justify-between p-16 xl:p-24 overflow-hidden text-white shadow-2xl">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/40 z-10 mix-blend-multiply" />
          <img 
            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=2070" 
            alt="Organic Farm"
            className="w-full h-full object-cover grayscale-[20%] brightness-[0.7]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/40 to-transparent pointer-events-none"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <Link href="/" className="inline-flex items-center gap-3 group mb-24 text-white hover:text-accent transition-all hover:scale-105 active:scale-95">
            <div className="h-12 w-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-xl">🌱</div>
            <span className="font-display text-4xl font-black tracking-tighter">Next360</span>
          </Link>

          <GlassCard className="p-10 border-white/10 bg-white/5 backdrop-blur-md max-w-xl group hover:bg-white/10 transition-colors duration-500">
            <h2 className="font-display text-7xl leading-[0.95] font-black mb-10 text-white tracking-tighter">
              Pure food,<br/>
              <span className="text-secondary italic">real farmers</span>,<br/>
              happy you.
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-5 text-xl font-bold text-white/90"
                >
                  <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30 shadow-inner">
                    <CheckCircle2 className="text-secondary" size={18} />
                  </div>
                  <span className="tracking-tight">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.6 }}
           transition={{ delay: 1 }}
           className="relative z-20 flex gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/70"
        >
          <span>© 2026 Next360</span>
          <span className="w-1 h-1 bg-white/40 rounded-full self-center" />
          <span>Crafted for Bharat</span>
        </motion.div>
      </div>

      {/* RIGHT: Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 xl:p-24 relative bg-cream">
        <div className="w-full max-w-[480px] relative z-10">
          <div className="lg:hidden mb-12 flex justify-center">
             <Link href="/" className="font-display font-black text-5xl tracking-tighter text-primary flex items-center gap-3">
                <span className="text-3xl">🌱</span> Next360
             </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-12 text-center lg:text-left">
              <h1 className="font-display text-6xl font-black text-slate-900 mb-4 leading-none tracking-tighter">
                Welcome <span className="text-primary italic">Back</span>
              </h1>
              <p className="text-slate-500 font-bold text-xl tracking-tight leading-snug">Sign in to nourish your soul with the goodness of nature.</p>
            </div>

            <GlassCard className="p-10 border-black/5 bg-white/40 shadow-2xl shadow-primary/5 rounded-[3.5rem]">
              <div className="space-y-10">
                 <LoginForm />

                 <div className="relative flex items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-6 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-transparent">Secure Grid Connection</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                 </div>

                 <GoogleAuthButton />

                 <div className="text-center pt-2">
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">
                    Don't have an account?
                  </p>
                  <Link 
                    href="/register" 
                    className="inline-flex items-center gap-2 text-primary hover:text-secondary font-black text-2xl tracking-tighter group transition-all"
                  >
                    Join the revolution
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                  </Link>
                 </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Floating Organic Accents */}
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </div>
  )
}
