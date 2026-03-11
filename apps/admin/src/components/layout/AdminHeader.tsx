'use client'

import React from 'react'
import { Bell, Search, Settings, Grid, Maximize } from 'lucide-react'

export function AdminHeader() {

  return (
    <header className="h-20 bg-slate-950/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-30 font-sans shadow-2xl">
      {/* Search Bar / Context area */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
           <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-slate-500 group-focus-within:text-primary transition-colors" />
           </div>
           <input 
             type="text"
             placeholder="COMMAND SEQUENCE (⌘+K)"
             className="w-full bg-white/[0.03] border-white/5 border focus:border-primary/20 focus:bg-white/[0.05] rounded-full py-3.5 pl-12 pr-6 text-xs font-black tracking-widest uppercase transition-all focus:shadow-[0_0_40px_rgba(22,163,74,0.15)] outline-none placeholder:text-slate-500 text-white"
           />
        </div>
      </div>
 
      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 mr-4 pr-6 border-r border-white/5">
           <div className="h-10 px-5 rounded-full bg-primary/10 flex items-center gap-3 text-primary border border-primary/20 shadow-lg shadow-primary/5 hover:scale-105 transition-transform cursor-default">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(22,163,74,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] italic">Engine Live</span>
           </div>
        </div>
 
        {[
          { icon: Bell, label: 'Notifications', hasDot: true },
          { icon: Grid, label: 'Apps' },
          { icon: Settings, label: 'Settings' }
        ].map((action, i) => (
          <button 
            key={i}
            className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all relative group"
            title={action.label}
          >
            <action.icon size={20} strokeWidth={2.5} />
            {action.hasDot && (
               <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-[3px] border-slate-950 shadow-sm" />
            )}
          </button>
        ))}
 
        <div className="ml-4 pl-4 border-l border-white/5 hidden md:block">
           <button className="w-12 h-12 rounded-[1.25rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all group shadow-inner">
              <Maximize size={18} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
           </button>
        </div>
      </div>
    </header>
  )
}
