'use client'

import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../services/vendorService'
import VendorStatsRow from '../../components/dashboard/VendorStatsRow'
import VendorRevenueChart from '../../components/dashboard/VendorRevenueChart'
import VendorRecentOrders from '../../components/dashboard/VendorRecentOrders'
import { Loader2 } from 'lucide-react'

export default function VendorDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['vendor-dashboard-stats'],
    queryFn: () => vendorService.getDashboardStats(),
  })

  // Dummy data fallback for UI development
  const mockStats = {
    revenue: 452000,
    orders: 42,
    activeProducts: 15,
    avgRating: 4.8,
  }

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>
  if (error) return <div className="text-red-500">Failed to load dashboard data. Using simulated data.</div>

  const displayStats = stats?.data || mockStats

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Store Overview</h1>
        <p className="text-gray-500">Here's what's happening with your products today.</p>
      </div>

      <VendorStatsRow stats={displayStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VendorRevenueChart data={displayStats.revenueHistory || []} />
        <VendorRecentOrders />
      </div>
    </div>
  )
}
