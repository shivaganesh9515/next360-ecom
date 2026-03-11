'use client'

import React from 'react'
import { Bell, Search, Menu, LogOut, User, Settings, Info } from 'lucide-react'
import { useVendorAuthStore } from '../../store/vendorAuthStore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@next360/ui/Button'

export default function VendorHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { vendor, logout } = useVendorAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="h-24 bg-white/70 backdrop-blur-3xl border-b border-slate-100 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-40 font-sans">
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 text-slate-500 hover:bg-slate-100 rounded-full transition-all active:scale-90"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="md:flex items-center gap-4 hidden">
           <div className="h-10 px-5 rounded-full bg-primary/5 border border-primary/10 flex items-center gap-3 shadow-inner">
              <span className="w-2 h-2 bg-primary rounded-full animate-[pulse_2s_infinite]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Marketplace Online</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-8">
        <div className="hidden lg:flex relative group max-w-xs transition-all w-72 lg:focus-within:w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 transition-colors group-focus-within:text-primary" strokeWidth={3} />
          <input
            type="text"
            placeholder="Query Registry..."
            className="w-full bg-slate-50/50 border border-slate-100 focus:border-primary/20 focus:bg-white focus:shadow-2xl focus:shadow-primary/5 rounded-full py-3.5 pl-12 pr-6 text-sm font-bold text-slate-700 outline-none transition-all duration-500 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Bell, label: 'Notifications', hasDot: true },
            { icon: Info, label: 'Help' }
          ].map((action, i) => (
             <button 
               key={i}
               className="p-4 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-500 relative group active:scale-90"
             >
                <action.icon size={20} strokeWidth={2} />
                {action.hasDot && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white shadow-sm group-hover:scale-125 transition-transform" />
                )}
             </button>
          ))}
        </div>

        <div className="h-10 w-px bg-slate-100 mx-2 hidden sm:block" />

        <div className="flex items-center gap-4 group cursor-pointer active:scale-95 transition-all duration-500" onClick={handleLogout}>
           <div className="sm:flex flex-col text-right hidden">
              <p className="text-xs font-black text-slate-900 group-hover:text-primary transition-colors leading-none mb-1.5 italic tracking-tight">{vendor?.name || 'Partner account'}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Terminate Session</p>
           </div>
           <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500 shadow-sm relative overflow-hidden">
              <User size={20} strokeWidth={2.5} />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
        </div>
      </div>
    </header>
  )
}
