'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Tag,
  Truck,
  ShoppingBag,
  RefreshCw,
  Ticket,
  Users,
  Store,
  FileText,
  Image as ImageIcon,
  Bell,
  BarChart2,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Map,
  Megaphone,
  PanelsTopLeft,
  MousePointerClick,
  Layers3
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAdminAuthStore } from '../../store/adminAuthStore'
import { authService } from '../../services/authService'
import { cn } from '@next360/utils'

const NAV_GROUPS = [
  {
    label: 'Intelligence',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Control Center' },
      { href: '/analytics', icon: BarChart2, label: 'Analytics' },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { href: '/products', icon: Package, label: 'Products' },
      { href: '/categories', icon: Tag, label: 'Categories' },
      { href: '/suppliers', icon: Truck, label: 'Suppliers' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/orders', icon: ShoppingBag, label: 'Orders' },
      { href: '/subscriptions', icon: RefreshCw, label: 'Subscriptions' },
      { href: '/coupons', icon: Ticket, label: 'Campaigns' },
    ],
  },
  {
    label: 'Human Resources',
    items: [
      { href: '/users', icon: Users, label: 'Customers' },
      { href: '/vendors', icon: Store, label: 'Vendors' },
    ],
  },
  {
    label: 'CMS & Storefront',
    items: [
      { href: '/cms/zones', icon: Map, label: 'Zones' },
      { href: '/cms/announcements', icon: Megaphone, label: 'Announcements' },
      { href: '/cms/banners', icon: ImageIcon, label: 'Banners' },
      { href: '/cms/flash-sales', icon: Bell, label: 'Flash Sales' },
      { href: '/cms/homepage-sections', icon: PanelsTopLeft, label: 'Homepage Sections' },
      { href: '/cms/featured-slots', icon: Layers3, label: 'Featured Slots' },
      { href: '/cms/rythu-batches', icon: Store, label: 'Rythu Batches' },
      { href: '/cms/testimonials', icon: FileText, label: 'Testimonials' },
      { href: '/cms/popups', icon: MousePointerClick, label: 'Popups' },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { admin, logout } = useAdminAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      logout()
      router.push('/login')
    }
  }

  return (
    <aside className="bg-slate-950 text-white h-screen flex flex-col w-[280px] flex-shrink-0 border-r border-white/5 relative z-40 font-sans shadow-2xl">
      {/* Brand Header */}
      <div className="p-10 pb-12">
        <Link href="/dashboard" className="flex items-center gap-4 group">
          <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck className="text-white h-7 w-7" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black tracking-tighter italic">Next360</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] -mt-1 group-hover:tracking-[0.4em] transition-all">Executive</span>
          </div>
        </Link>
      </div>
 
      <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-12 no-scrollbar">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-[10px] text-slate-600 uppercase tracking-[0.4em] font-black ml-4 opacity-70">
              {group.label}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between px-5 py-4 rounded-3xl text-[13px] transition-all duration-300 relative overflow-hidden",
                        isActive 
                          ? "bg-white/[0.03] text-white shadow-xl border border-white/5" 
                          : "text-slate-500 hover:text-white hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <Icon className={cn("w-4.5 h-4.5 transition-colors", isActive ? "text-primary shadow-[0_0_10px_rgba(22,163,74,0.4)]" : "text-slate-600 group-hover:text-primary")} />
                        <span className="font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div layoutId="active-nav-bg" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(22,163,74,0.6)]" />
                      )}
                      <ChevronRight className={cn("w-3.5 h-3.5 transition-all duration-300", isActive ? "text-primary opacity-100" : "text-slate-800 opacity-0 group-hover:opacity-100 group-hover:translate-x-1")} />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
 
      {/* User Footer */}
      <div className="p-8 mt-auto border-t border-white/5 bg-white/[0.02] backdrop-blur-md">
        <div className="flex items-center gap-5">
           <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center font-black text-primary italic text-lg shadow-inner">
                 {admin?.name?.[0] || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full border-[3px] border-slate-950 shadow-lg" />
           </div>
           <div className="flex-1 min-w-0">
              <p className="text-sm font-black truncate tracking-tight text-white">{admin?.name || 'Administrator'}</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mt-1 italic">{admin?.role || 'SYSTEM ROOT'}</p>
           </div>
           <button 
             onClick={handleLogout}
             className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
           >
              <LogOut size={20} strokeWidth={2.5} />
           </button>
        </div>
      </div>
    </aside>
  )
}
