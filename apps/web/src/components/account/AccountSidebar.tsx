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
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
    toast.success('Logged out successfully')
  }

  const userInitials = MOCK_USER.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden sticky top-24">
      {/* User Card */}
      <div className="p-5 bg-cream/50 flex flex-col items-center border-b border-slate-100">
        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-display text-xl font-bold mb-3 shadow-lg shadow-primary/20">
          {userInitials}
        </div>
        <p className="font-bold text-slate-800">{MOCK_USER.name}</p>
        <p className="text-xs text-slate-500 mb-3">{MOCK_USER.email}</p>
        <Badge variant="fresh" className="bg-secondary/10 text-secondary border-none font-black px-3 py-1 flex items-center gap-1">
          🌱 <AnimatedCounter to={MOCK_USER.seeds} /> Seeds
        </Badge>
      </div>

      {/* Nav List */}
      <nav className="py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-slate-600 hover:text-primary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="account-sidebar-active"
                  className="absolute inset-0 bg-primary/10 border-r-2 border-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <item.icon size={16} className={isActive ? 'text-primary' : 'text-slate-400'} />
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-100 mt-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  )
}

