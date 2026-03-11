"use client"

import React from 'react'
import { Button, Input } from '@next360/ui'

export default function NewsletterBanner() {
  return (
    <section className="bg-white py-24 md:py-40 font-sans border-t border-slate-50">
      <div className="max-w-2xl mx-auto text-center px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
           <div className="h-1 w-6 bg-primary/30 rounded-full" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 italic">Sequence Dispatch</p>
        </div>
        <h2 className="font-black text-5xl md:text-7xl text-slate-900 mb-8 leading-[0.9] tracking-tighter italic">
          Protocol <span className="text-primary italic">Updates</span>
        </h2>
        <p className="text-slate-400 font-bold italic text-lg mb-12 leading-relaxed opacity-60">
          Subscribe to our high-fidelity supply chain sequences for premium yields and farm intelligence.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 p-2 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm focus-within:shadow-xl focus-within:border-primary/20 transition-all duration-700">
          <Input 
            type="email" 
            placeholder="Identity Verification (Email)" 
            className="flex-1 h-16 rounded-full bg-transparent border-none focus:ring-0 px-8 font-bold italic text-slate-900 placeholder:text-slate-300"
            required 
          />
          <Button size="lg" className="h-16 px-12 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 bg-primary text-white border-none hover:scale-[1.03] active:scale-95 transition-all duration-500">
            Join Nexus
          </Button>
        </form>
        
        <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mt-8 italic opacity-40">
          Secure Transmission. Zero INTERMEDIARY interference.
        </p>
      </div>
    </section>
  )
}
