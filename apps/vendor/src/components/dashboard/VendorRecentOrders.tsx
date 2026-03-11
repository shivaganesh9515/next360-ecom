'use client'

import { Card, Badge } from '@next360/ui'
import { DataTable } from '@next360/ui/DataTable'
import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../services/vendorService'
import { formatPrice } from '@next360/utils'

export default function VendorRecentOrders() {
  const { data, isLoading } = useQuery({
    queryKey: ['vendor-recent-orders'],
    queryFn: () => vendorService.getMyOrders({ limit: 5 })
  })

  const columns: any[] = [
    {
      accessorKey: 'id',
      header: 'Order #',
      cell: ({ row }: any) => <span className="font-medium">#{row.id.slice(-6)}</span>
    },
    {
      accessorKey: 'customer.name',
      header: 'Customer',
      cell: ({ row }: any) => <span>{row.user?.name || 'Guest'}</span>
    },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: ({ row }: any) => <span>{formatPrice(row.totalAmount || 0)}</span>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const statuses: Record<string, string> = {
          PENDING: 'bg-yellow-100 text-yellow-800',
          PROCESSING: 'bg-blue-100 text-blue-800',
          SHIPPED: 'bg-purple-100 text-purple-800',
          DELIVERED: 'bg-green-100 text-green-800',
        }
        return (
          <Badge className={statuses[row.status] || 'bg-cream text-text'} variant="info">
            {row.status}
          </Badge>
        )
      }
    }
  ]

  const orders = data?.orders || []

  return (
    <Card>
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={orders}
          />
        )}
      </div>
    </Card>
  )
}
