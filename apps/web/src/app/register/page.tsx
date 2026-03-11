'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import RegisterForm from '@/components/auth/RegisterForm'
import GoogleAuthButton from '@/app/login/GoogleAuthButton'
import { GlassCard } from '@next360/ui/GlassCard'

const benefits = [
  "Free delivery on your first 3 orders",
  "Farm-to-table freshness guaranteed",
  "Early access to seasonal harvests",
  "Earn Seeds (loyalty points) on every purchase"
]

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cream flex overflow-hidden font-sans">
      {/* LEFT: Branding/Visual (Hidden on mobile) */}
      <div className="hidden lg:flex w-[42%] bg-surface relative flex-col justify-between p-16 xl:p-24 overflow-hidden text-text border-r border-slate-200/50 shadow-2xl">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1974" 
            alt="Organic Harvest"
            className="w-full h-full object-cover brightness-[0.9] saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 z-10" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <Link href="/" className="inline-flex items-center gap-3 group mb-24 text-primary hover:text-secondary transition-all hover:scale-105">
            <div className="h-12 w-12 bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl flex items-center justify-center text-3xl shadow-xl">🌱</div>
            <span className="font-display text-4xl font-black tracking-tighter">Next360</span>
          </Link>

          <GlassCard className="p-10 border-primary/5 bg-white/20 backdrop-blur-md max-w-xl group hover:bg-white/30 transition-colors duration-500">
            <h2 className="font-display text-7xl leading-[0.95] font-black mb-10 text-slate-900 tracking-tighter">
              Join the <br/>
              <span className="text-primary italic underline underline-offset-8 decoration-primary/20">organic</span> <br/>
              revolution.
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-5 text-xl font-bold text-slate-800"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                    <CheckCircle2 className="text-primary" size={18} />
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
           className="relative z-20 flex gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500"
        >
          <span>© 2026 Next360</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full self-center" />
          <span>United Health</span>
        </motion.div>
      </div>

      {/* RIGHT: Register Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 xl:p-24 relative bg-cream overflow-y-auto">
        <div className="w-full max-w-[540px] relative z-10 py-12">
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
              <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-all text-[11px] font-black uppercase tracking-[0.2em] mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" strokeWidth={3} />
                Back to sign in
              </Link>
              <h1 className="font-display text-6xl font-black text-slate-900 mb-4 leading-none tracking-tighter">
                Create <span className="text-primary italic">Account</span>
              </h1>
              <p className="text-slate-500 font-bold text-xl tracking-tight leading-snug">Start your journey towards a healthier lifestyle today.</p>
            </div>

            <GlassCard className="p-10 border-black/5 bg-white/40 shadow-2xl shadow-primary/5 rounded-[3.5rem]">
              <div className="space-y-10">
                 <RegisterForm />

                 <div className="relative flex items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Partner Identity</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                 </div>

                 <GoogleAuthButton />

                 <div className="text-center pt-4 border-t border-slate-200/50">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    By joining, you agree to our policies
                  </p>
                  <div className="flex justify-center gap-6 text-xs font-black text-primary uppercase tracking-widest">
                    <Link href="/terms" className="hover:text-secondary underline underline-offset-4 decoration-2 decoration-primary/20">Terms</Link>
                    <Link href="/privacy" className="hover:text-secondary underline underline-offset-4 decoration-2 decoration-primary/20">Privacy</Link>
                  </div>
                 </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Floating Organic Accents */}
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </div>
  )
}
