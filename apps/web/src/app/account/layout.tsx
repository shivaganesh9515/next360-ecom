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

  const userInitials = MOCK_USER.name.split(' ').map(n => n[0]).join('')

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-20 md:pb-0">
      {/* Page Header */}
      <div className="bg-cream/40 py-8 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex justify-center items-center font-display text-xl font-bold shadow-lg shadow-primary/20">
            {userInitials}
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-black text-primary mb-1">
              Hello, {MOCK_USER.name.split(' ')[0]} 👋
            </h1>
            <Badge variant="fresh" className="bg-secondary/10 text-secondary border-none font-black">
              🌱 {MOCK_USER.seeds.toLocaleString()} Seeds
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center px-2 py-3 z-40 pb-safe">
        {MOBILE_TABS.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link 
              key={tab.href} 
              href={tab.href}
              onClick={() => setIsMoreMenuOpen(false)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-colors",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon size={20} className={isActive ? "fill-primary/20" : ""} />
              <span className="text-[10px] font-bold">{tab.label}</span>
            </Link>
          )
        })}
        <button 
          onClick={() => setIsMoreMenuOpen(true)}
          className={cn(
            "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-colors",
            isMoreMenuOpen ? "text-primary" : "text-slate-400"
          )}
        >
          <MoreHorizontal size={20} />
          <span className="text-[10px] font-bold">More</span>
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
              className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-[2rem] p-6 pb-24 md:hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-xl text-primary">More Options</h3>
                <button 
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-2">
                {MORE_LINKS.map(link => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      <link.icon size={20} className={isActive ? "text-primary box-content" : "text-slate-400"} />
                      <span className="font-bold">{link.label}</span>
                    </Link>
                  )
                })}
                <button
                  onClick={() => {/* add logout */}}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut size={20} className="text-red-400" />
                  <span className="font-bold">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
