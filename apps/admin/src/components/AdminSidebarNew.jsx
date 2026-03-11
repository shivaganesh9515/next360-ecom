'use client'

import { motion } from 'framer-motion'
import { LayoutDashboard, Box, Users, Map, ShieldCheck, Bell, Settings, LogOut, ChevronRight, BarChart3, AppWindow, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Product Registry', icon: Box, href: '/admin/products' },
    { label: 'Vendor Network', icon: Users, href: '/admin/vendors' },
    { label: 'Promo Approvals', icon: Bell, href: '/admin/approvals' },
    { label: 'Zone Operations', icon: Map, href: '/admin/zones' },
    { label: 'Cert Audits', icon: ShieldCheck, href: '/admin/audits' },
    { label: 'Platform CMS', icon: AppWindow, href: '/admin/cms' },
    { label: 'Global Analytics', icon: BarChart3, href: '/admin/analytics' },
  ]

  return (
    <aside className="w-72 bg-[#0A0A0A] h-screen flex flex-col border-r border-white/5 font-sans sticky top-0">
       <div className="p-8 pb-12">
          <Link href="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-secondary/20">N</div>
             <div>
                <span className="text-xl font-display font-black text-white tracking-tighter block leading-none">Next360</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary mt-1 block">Governance</span>
             </div>
          </Link>
       </div>

       <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
             const isActive = pathname === link.href
             return (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                    isActive ? "bg-white/10 text-white shadow-xl shadow-black/40" : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  )}
                >
                   <div className="flex items-center gap-4">
                      <link.icon className={cn("w-5 h-5", isActive ? "text-secondary" : "")} />
                      <span className="text-sm font-bold">{link.label}</span>
                   </div>
                   {isActive && <motion.div layoutId="nav-pill" className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                </Link>
             )
          })}
       </nav>

       <div className="p-6">
          <div className="bg-white/5 rounded-[2rem] p-6 space-y-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                   <User className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-white">Shiva Ganesh</p>
                   <p className="text-[10px] text-white/40 font-medium uppercase">Master Admin</p>
                </div>
             </div>
             <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-all text-xs font-black uppercase tracking-widest">
                <LogOut className="w-4 h-4" /> Sign Out
             </button>
          </div>
       </div>
    </aside>
  )
}
