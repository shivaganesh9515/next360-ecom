'use client'

import { Bell, Search, Settings, HelpCircle, Activity } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'

export function AdminNavbar() {
  return (
    <header className="h-20 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-10 font-sans">
       <div className="flex-1 max-w-xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-secondary transition-colors" />
          <input 
            type="text" 
            placeholder="Search for batches, vendors, or certificates..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl h-11 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
          />
       </div>

       <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/5 pr-6">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                <Activity className="w-3 h-3 text-secondary" />
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase">System: Stable</span>
             </div>
             <Badge variant="organic" className="bg-white/5 border-white/10 text-white">V2.4.1</Badge>
          </div>

          <div className="flex items-center gap-2">
             <button className="w-11 h-11 rounded-xl hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A0A0A]" />
             </button>
             <button className="w-11 h-11 rounded-xl hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
             </button>
             <button className="w-11 h-11 rounded-xl hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-all">
                <HelpCircle className="w-5 h-5" />
             </button>
          </div>
       </div>
    </header>
  )
}
