import { Activity, DollarSign, Package, Users } from 'lucide-react'

interface StatsRowProps {
  stats: {
    revenue: number
    revenueGrowth: number
    orders: number
    ordersGrowth: number
    customers: number
    customersGrowth: number
    products: number
    productsGrowth: number
  }
}

export function StatsRow({ stats }: StatsRowProps) {
  const items = [
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: stats.orders.toLocaleString(),
      growth: stats.ordersGrowth,
      icon: Package,
    },
    {
      title: 'Active Customers',
      value: stats.customers.toLocaleString(),
      growth: stats.customersGrowth,
      icon: Users,
    },
    {
      title: 'Active Products',
      value: stats.products.toLocaleString(),
      growth: stats.productsGrowth,
      icon: Activity,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {items.map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted">{item.title}</h3>
            <div className="p-2 bg-primary/5 rounded-lg">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text">{item.value}</span>
            <span className={`text-xs font-medium ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {item.growth >= 0 ? '+' : ''}{item.growth}%
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
