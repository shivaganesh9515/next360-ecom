'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@next360/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  Settings,
  X,
  Store,
  ChevronRight,
  TrendingUp,
  Leaf
} from 'lucide-react'
import { motion } from 'framer-motion'

const navLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Finances', href: '/payouts', icon: CreditCard },
  { name: 'Feedback', href: '/reviews', icon: MessageSquare },
  { name: 'Storefront', href: '/settings', icon: Settings },
]

export default function VendorSidebar({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-[320px] bg-white border-r border-slate-100 transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:static lg:translate-x-0 flex flex-col h-full font-sans shadow-2xl shadow-slate-100/50',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="h-24 flex items-center justify-between px-10 border-b border-slate-50 shrink-0">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="h-12 w-12 bg-primary/5 rounded-[1.25rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
             <Leaf className="text-primary w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-black text-slate-900 tracking-tighter italic">Next360</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mt-1.5 ml-0.5">Partners</span>
          </div>
        </Link>
        <button className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-primary/5" onClick={() => setOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-10 px-6 space-y-10 no-scrollbar">
         <div>
            <div className="flex items-center gap-3 mb-6 ml-4">
               <div className="h-1 w-6 bg-primary/20 rounded-full" />
               <h3 className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Network Control</h3>
            </div>
            <nav className="space-y-2">
               {navLinks.map((link) => {
                 const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                 const Icon = link.icon
                 return (
                   <Link
                     key={link.name}
                     href={link.href}
                     onClick={() => setOpen(false)}
                     className={cn(
                       'group flex items-center justify-between px-6 py-4 rounded-full text-sm font-bold transition-all duration-500 relative overflow-hidden',
                       isActive
                         ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                         : 'text-slate-500 hover:text-primary hover:bg-primary/5'
                     )}
                   >
                     <div className="flex items-center gap-4 relative z-10">
                        <Icon className={cn("w-5 h-5 transition-colors duration-500", isActive ? "text-white" : "text-primary/60 group-hover:text-primary")} strokeWidth={isActive ? 3 : 2} />
                        <span className="tracking-tight">{link.name}</span>
                     </div>
                     {isActive && (
                        <motion.div layoutId="active-vendor-nav" className="relative z-10">
                           <ChevronRight className="w-4 h-4 text-white/40" strokeWidth={3} />
                        </motion.div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   </Link>
                 )
               })}
            </nav>
         </div>

         {/* Intelligence Promo */}
         <div className="px-2">
            <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-white/5 relative overflow-hidden group shadow-2xl shadow-slate-900/20">
               <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
               <div className="relative z-10">
                  <TrendingUp className="text-primary w-8 h-8 mb-4" strokeWidth={2.5} />
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Matrix v2.0</p>
                  <p className="text-xs font-bold text-slate-400 leading-relaxed italic opacity-80 underline underline-offset-4 decoration-primary/30">Advanced yield forecasting and deployment analytics coming online soon.</p>
               </div>
            </div>
         </div>
      </div>

      <div className="p-8 border-t border-slate-50 bg-slate-50/30 mt-auto">
         <div className="flex items-center gap-5 px-2">
            <div className="w-12 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 text-white flex items-center justify-center font-black text-xl italic">
               M
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-black text-slate-900 truncate tracking-tight mb-1 italic">Modern Farms</p>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Hub</p>
               </div>
            </div>
         </div>
      </div>
    </aside>
  )
}
