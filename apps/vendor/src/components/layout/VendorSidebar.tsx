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
  Store
} from 'lucide-react'

const navLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Payouts', href: '/payouts', icon: CreditCard },
  { name: 'Reviews', href: '/reviews', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function VendorSidebar({ open, setOpen }: { open: boolean, setOpen: (val: boolean) => void }) {
  const pathname = usePathname()

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col h-full",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-green-700">
          <Store className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">Vendor Portal</span>
        </Link>
        <button 
          className="lg:hidden text-gray-500 hover:text-gray-700" 
          onClick={() => setOpen(false)}
        >
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                isActive 
                  ? "bg-green-50 text-green-700" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
