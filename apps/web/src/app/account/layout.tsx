"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@next360/ui'
import { MOCK_USER } from '@/lib/mockAccount'
import AccountSidebar from '@/components/account/AccountSidebar'
import { LayoutDashboard, Package, User, Leaf, MoreHorizontal, X, Heart, RefreshCw, MapPin, Target, Globe, LogOut } from 'lucide-react'
import { cn } from '@next360/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'

const MOBILE_TABS = [
  { href: '/account', icon: LayoutDashboard, label: 'Home' },
  { href: '/account/orders', icon: Package, label: 'Orders' },
  { href: '/account/profile', icon: User, label: 'Profile' },
  { href: '/account/seeds', icon: Leaf, label: 'Seeds' },
]

const MORE_LINKS = [
  { href: '/account/subscriptions', icon: RefreshCw, label: 'Subscriptions' },
  { href: '/account/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/account/addresses', icon: MapPin, label: 'Addresses' },
  { href: '/account/health-goals', icon: Target, label: 'Health Goals' },
  { href: '/account/impact', icon: Globe, label: 'My Impact' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const { user } = useAuthStore()

  const userInitials = (user?.name || 'User').split(' ').map(n => n[0]).join('')

  return (
    <main className="min-h-screen bg-white pt-24 pb-24 md:pb-0">
      {/* Page Header */}
      <div className="bg-slate-50 py-12 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 relative z-10">
          <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex justify-center items-center text-2xl font-black shadow-2xl shadow-slate-900/20 italic">
            {userInitials}
          </div>
          <div>
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-3">
               <span className="w-6 h-[1.5px] bg-primary" /> Active Instance
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-1 tracking-tighter italic">
              Welcome, {user?.name.split(' ')[0] || 'Operator'}
            </h1>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-4 py-1.5 shadow-sm mt-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Leaf size={10} className="text-primary" /> {user?.seeds?.toLocaleString() || 0} Equity Nodes
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20">
          {/* Left Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
             <div className="min-h-[60vh]">
                {children}
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-slate-900 rounded-full border border-white/10 flex justify-around items-center px-4 py-4 z-40 shadow-2xl">
        {MOBILE_TABS.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link 
              key={tab.href} 
              href={tab.href}
              onClick={() => setIsMoreMenuOpen(false)}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all p-2 rounded-full",
                isActive ? "text-primary scale-110" : "text-slate-500"
              )}
            >
              <tab.icon size={20} strokeWidth={isActive ? 3 : 2} />
            </Link>
          )
        })}
        <button 
          onClick={() => setIsMoreMenuOpen(true)}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all p-2 rounded-full",
            isMoreMenuOpen ? "text-primary scale-110" : "text-slate-500"
          )}
        >
          <MoreHorizontal size={20} strokeWidth={isMoreMenuOpen ? 3 : 2} />
        </button>
      </div>

      {/* Mobile More Sheet */}
      <AnimatePresence>
        {isMoreMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-[3rem] p-10 pb-20 md:hidden border-t border-slate-100 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                   <div className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-1 italic">Extended Protocol</div>
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight italic leading-none">Navigation</h3>
                </div>
                <button 
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 shadow-inner border border-slate-100"
                >
                  <X size={20} strokeWidth={3} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {MORE_LINKS.map(link => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-6 p-6 rounded-3xl transition-all duration-300",
                        isActive ? "bg-slate-50 shadow-inner text-primary" : "text-slate-400 hover:bg-slate-50/50 hover:text-slate-900"
                      )}
                    >
                      <link.icon size={20} strokeWidth={isActive ? 3 : 2} className={cn("transition-colors", isActive ? "text-primary" : "text-slate-300")} />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">{link.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                  )
                })}
                <button
                  onClick={() => {/* add logout */}}
                  className="w-full flex items-center gap-6 p-6 rounded-3xl text-red-400 hover:bg-red-50/50 hover:text-red-500 transition-all text-left"
                >
                  <LogOut size={20} strokeWidth={3} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">Terminate Session</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
