'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useVendorAuthStore } from '../../store/vendorAuthStore'
import VendorLayout from '../../components/layout/VendorLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useVendorAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
      router.push('/login')
    }
  }, [isClient, isAuthenticated, router, pathname])

  if (!isClient) return <div className="min-h-screen bg-cream/50"></div>
  if (!isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) return <div className="min-h-screen bg-cream/50"></div>

  return <VendorLayout>{children}</VendorLayout>
}
