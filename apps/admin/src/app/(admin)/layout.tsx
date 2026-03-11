import { AdminLayout } from '@/components/layout/AdminLayout'
import type { ReactNode } from 'react'

export default function AdminProtectedLayout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
