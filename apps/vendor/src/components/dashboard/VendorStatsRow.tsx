import { IndianRupee, ShoppingCart, Package, Star } from 'lucide-react'
import { Card } from '@next360/ui'

export default function VendorStatsRow({ stats }: { stats: any }) {
  const metrics = [
    {
      title: 'Total Revenue',
      value: `₹${((stats.revenue || 0) / 100).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Orders This Month',
      value: stats.orders || 0,
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Active Products',
      value: stats.activeProducts || 0,
      icon: Package,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Average Rating',
      value: stats.avgRating?.toFixed(1) || '0.0',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
