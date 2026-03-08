'use client'

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
} from 'lucide-react'

const navLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Payouts', href: '/payouts', icon: CreditCard },
  { name: 'Reviews', href: '/reviews', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function VendorSidebar({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 w-[272px] bg-primary text-white border-r border-white/10 transform transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col h-full',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Store className="w-5 h-5" />
          <span className="font-display text-xl tracking-tight">Vendor Portal</span>
        </Link>
        <button className="lg:hidden text-white/75 hover:text-white" onClick={() => setOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
          const Icon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all',
                isActive
                  ? 'bg-white/18 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]'
                  : 'text-white/75 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
