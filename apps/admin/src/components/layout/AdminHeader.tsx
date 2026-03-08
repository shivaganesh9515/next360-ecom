'use client'

import Link from 'next/link'
import { Bell, Menu, UserCircle, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAdminAuthStore } from '../../store/adminAuthStore'
import { authService } from '../../services/authService'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { formatDistanceToNow } from 'date-fns'

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { admin, logout } = useAdminAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const { data: alerts = [] } = useQuery({
    queryKey: ['admin-alerts'],
    queryFn: adminService.getAlerts,
    staleTime: 60 * 1000,
  })

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) return [{ label: 'Dashboard', href: '/dashboard' }]

    return segments.map((seg, idx) => {
      const isLast = idx === segments.length - 1
      const href = '/' + segments.slice(0, idx + 1).join('/')
      const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')
      return { label, href: isLast ? undefined : href }
    })
  }

  const breadcrumbs = getBreadcrumbs()
  const title = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'
  const unreadAlerts = alerts.filter((a: any) => !a.read).length

  return (
    <header className="bg-[rgba(251,249,243,0.92)] backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 -ml-2 text-muted hover:bg-cream rounded-lg"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-display text-xl text-text tracking-tight">{title}</h1>
          <nav className="flex items-center text-xs text-muted mt-0.5 space-x-1">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Admin</Link>
            <span className="text-ink-faint">&gt;</span>
            {breadcrumbs.map((bc, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                {bc.href ? (
                  <Link href={bc.href} className="hover:text-primary transition-colors">{bc.label}</Link>
                ) : (
                  <span className="text-text font-medium">{bc.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && <span className="text-ink-faint">&gt;</span>}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-muted hover:bg-cream rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border shadow-[0_20px_44px_rgba(31,48,40,0.12)] rounded-[20px] overflow-hidden py-2 z-50">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="font-semibold text-sm">Notifications</span>
                <span className="text-xs bg-cream text-muted px-2 py-1 rounded-full">{alerts.length} new</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="p-6 text-center text-sm text-muted">All clear - no alerts right now</div>
                ) : (
                  <div className="flex flex-col">
                    {alerts.slice(0, 5).map((alert: any) => (
                      <Link
                        key={alert.id}
                        href={alert.href || '/dashboard'}
                        className="px-4 py-3 hover:bg-cream border-b border-border/50 last:border-0"
                        onClick={() => setNotifOpen(false)}
                      >
                        <p className="text-sm text-text line-clamp-2">{alert.message}</p>
                        <span className="text-xs text-muted mt-1 block">
                          {formatDistanceToNow(new Date(alert.createdAt || Date.now()), { addSuffix: true })}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {alerts.length > 0 && (
                <div className="px-4 py-2 border-t border-border text-center">
                  <Link href="/dashboard" className="text-xs text-primary font-medium hover:underline" onClick={() => setNotifOpen(false)}>
                    View All in Dashboard
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-2 md:pl-4 border-l border-border"
          >
            <div className="w-8 h-8 flex-shrink-0 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold text-sm">
              {admin?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:flex flex-col items-start pr-1">
              <span className="text-sm font-medium text-text leading-none">{admin?.name || 'Admin'}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-border shadow-[0_20px_44px_rgba(31,48,40,0.12)] rounded-[20px] overflow-hidden py-1 z-50">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-text truncate">{admin?.name}</p>
                <p className="text-xs text-muted truncate">{admin?.email}</p>
              </div>
              <div className="py-1">
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-[#4e5954] hover:bg-cream" onClick={() => setProfileOpen(false)}>
                  <UserCircle className="w-4 h-4" /> My Profile
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-[#4e5954] hover:bg-cream" onClick={() => setProfileOpen(false)}>
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </div>
              <div className="border-t border-border py-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
