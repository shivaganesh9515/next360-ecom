'use client'

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
  Settings,
  LogOut,
} from 'lucide-react'
import { useAdminAuthStore } from '../../store/adminAuthStore'
import { authService } from '../../services/authService'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    label: 'Catalogue',
    items: [
      { href: '/products', icon: Package, label: 'Products' },
      { href: '/categories', icon: Tag, label: 'Categories' },
      { href: '/suppliers', icon: Truck, label: 'Suppliers' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { href: '/orders', icon: ShoppingBag, label: 'Orders' },
      { href: '/subscriptions', icon: RefreshCw, label: 'Subscriptions' },
      { href: '/coupons', icon: Ticket, label: 'Coupons' },
    ],
  },
  {
    label: 'People',
    items: [
      { href: '/users', icon: Users, label: 'Users' },
      { href: '/vendors', icon: Store, label: 'Vendors' },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/content/blog', icon: FileText, label: 'Blog' },
      { href: '/content/banners', icon: ImageIcon, label: 'Banners' },
      { href: '/content/notifications', icon: Bell, label: 'Notifications' },
    ],
  },
  {
    label: 'Reports',
    items: [{ href: '/analytics', icon: BarChart2, label: 'Analytics' }],
  },
  {
    label: 'System',
    items: [{ href: '/settings', icon: Settings, label: 'Settings' }],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { admin, logout } = useAdminAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (e) {
      console.error(e)
    } finally {
      logout()
      router.push('/login')
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return 'A'
    const parts = name.split(' ')
    return parts.map((p) => p[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <aside className="bg-primary text-white h-full flex flex-col w-[272px] flex-shrink-0 border-r border-white/10">
      <div className="p-6 border-b border-white/10 shrink-0">
        <Link href="/dashboard" className="flex flex-col">
          <span className="font-display text-[1.55rem] text-white tracking-wide">Next360</span>
          <span className="text-[10px] text-white/55 uppercase tracking-[0.22em] mt-1 font-medium">Admin Panel</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-7">
            <h3 className="text-[10px] text-white/45 uppercase tracking-[0.2em] px-5 pt-2 pb-2 font-semibold">
              {group.label}
            </h3>
            <ul className="space-y-1 px-3">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                        isActive
                          ? 'bg-white/18 text-white font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]'
                          : 'text-white/72 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-white/10 p-4 shrink-0 flex items-center justify-between bg-black/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">
            {getInitials(admin?.name)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-white truncate max-w-[120px]">{admin?.name || 'Admin'}</span>
            <span className="text-xs text-white/55">Administrator</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}
