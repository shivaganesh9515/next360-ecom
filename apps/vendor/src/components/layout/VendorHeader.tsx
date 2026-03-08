'use client'

import { Menu, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useVendorAuthStore } from '../../store/vendorAuthStore'
import { Button } from '@next360/ui'

export default function VendorHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { vendor, logout } = useVendorAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="h-16 bg-[rgba(251,249,243,0.92)] backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-muted hover:bg-cream rounded-lg lg:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted hover:bg-cream rounded-full relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="h-8 w-px bg-border hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-text leading-tight">{vendor?.storeName || 'Vendor Hub'}</span>
            <span className="text-xs text-muted leading-tight">Vendor</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            {vendor?.storeName?.charAt(0) || 'V'}
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
