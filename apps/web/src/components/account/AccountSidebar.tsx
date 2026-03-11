"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Package, RefreshCw, Heart, 
  MapPin, User, Target, Leaf, Globe, LogOut 
} from 'lucide-react'
import { MOCK_USER } from '@/lib/mockAccount'
import { Badge, AnimatedCounter } from '@next360/ui'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@next360/utils'

const NAV_ITEMS = [
  { href: '/account',               icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/account/orders',        icon: Package,         label: 'My Orders' },
  { href: '/account/subscriptions', icon: RefreshCw,       label: 'Subscriptions' },
  { href: '/account/wishlist',      icon: Heart,           label: 'Wishlist' },
  { href: '/account/addresses',     icon: MapPin,          label: 'Addresses' },
  { href: '/account/profile',       icon: User,            label: 'Profile' },
  { href: '/account/health-goals',  icon: Target,          label: 'Health Goals' },
  { href: '/account/seeds',         icon: Leaf,            label: 'Seeds Wallet' },
  { href: '/account/impact',        icon: Globe,           label: 'My Impact' },
]

export default function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('System de-authenticated')
  }

  const userInitials = (user?.name || 'User').split(' ').map(n => n[0]).join('')

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden sticky top-32 shadow-2xl shadow-slate-200/40">
      {/* User Card */}
      <div className="p-8 bg-slate-50 flex flex-col items-center border-b border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700" />
        
        <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-2xl mb-5 shadow-xl shadow-slate-900/20 relative z-10 italic">
          {userInitials}
        </div>
        <p className="font-black text-slate-800 text-lg tracking-tight relative z-10 leading-none mb-1">{user?.name || 'Fleet Operator'}</p>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6 relative z-10">{user?.email}</p>
        
        <div className="bg-white border border-slate-100 rounded-full px-5 py-2 shadow-sm relative z-10 group/seeds">
           <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <Leaf size={12} strokeWidth={3} className="group-hover/seeds:rotate-12 transition-transform" />
              <AnimatedCounter to={user?.seeds || 0} /> Equity Nodes
           </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="py-6 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 rounded-2xl group",
                isActive 
                  ? "text-slate-900 bg-slate-50 shadow-inner" 
                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-50/50"
              )}
            >
              <item.icon size={16} strokeWidth={isActive ? 3 : 2} className={cn("transition-colors", isActive ? 'text-primary' : 'text-slate-300 group-hover:text-slate-500')} />
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-500 hover:bg-red-50/50 rounded-2xl transition-all group"
        >
          <LogOut size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
          Terminate Session
        </button>
      </div>
    </div>
  )
}

