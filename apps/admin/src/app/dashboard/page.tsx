'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { StatsRow } from '../../components/dashboard/StatsRow'
import { RevenueChart } from '../../components/dashboard/RevenueChart'
import { OrderStatusChart } from '../../components/dashboard/OrderStatusChart'
import { RecentOrdersTable } from '../../components/dashboard/RecentOrdersTable'
import { AlertsPanel } from '../../components/dashboard/AlertsPanel'

export default function DashboardPage() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminService.getDashboardStats('30d')
  })

  const { data: recentOrders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-recent-orders'],
    queryFn: () => adminService.getRecentOrders(5)
  })

  const { data: alerts = [], isLoading: alertsLoading } = useQuery({
    queryKey: ['admin-alerts'],
    queryFn: () => adminService.getAlerts()
  })

  // Dummy data if API returns null/empty while testing without real data
  const defaultStats = {
    revenue: 0, revenueGrowth: 0,
    orders: 0, ordersGrowth: 0,
    customers: 0, customersGrowth: 0,
    products: 0, productsGrowth: 0,
    revenueHistory: [],
    orderStatuses: []
  }

  const s = statsData || defaultStats

  if (statsLoading || ordersLoading || alertsLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] bg-gray-200 rounded-2xl"></div>
          <div className="h-[400px] bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] bg-gray-200 rounded-2xl"></div>
          <div className="h-[400px] bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-text">Platform Overview</h2>
        <p className="text-muted text-sm mt-1">Key metrics and recent activity for the last 30 days.</p>
      </div>

      {/* Top Stats */}
      <StatsRow stats={s} />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart data={s.revenueHistory || []} />
        </div>
        <div>
          <OrderStatusChart data={s.orderStatuses || []} />
        </div>
      </div>

      {/* Tables and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentOrdersTable data={recentOrders.orders || []} />
        </div>
        <div>
          <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </div>
  )
}
