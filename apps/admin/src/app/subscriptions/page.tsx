'use client'

import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@next360/ui/DataTable'
import { adminService } from '../../services/adminService'
import { formatPrice } from '@next360/utils'

export default function SubscriptionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-subscriptions'],
    queryFn: () => adminService.getSubscriptions()
  })
  
  const columns: any[] = [
    {
      accessorKey: 'id',
      header: 'Sub ID',
      cell: (row: any) => <span className="font-mono text-sm">#{row.id.slice(-6)}</span>
    },
    {
      accessorKey: 'user.name',
      header: 'Customer',
      cell: (row: any) => <span className="font-medium text-gray-900">{row.user?.name || 'Guest'}</span>
    },
    {
      accessorKey: 'box.name',
      header: 'Box Type',
      cell: (row: any) => <span className="font-medium">{(row.box?.name || 'Custom Box')}</span>
    },
    {
      accessorKey: 'frequency',
      header: 'Frequency',
      cell: (row: any) => <span className="capitalize">{row.interval?.toLowerCase() || 'Weekly'}</span>
    },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: (row: any) => <span>{formatPrice(row.totalAmount || 0)}</span>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: any) => (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-widest ${
          row.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ]

  const subscriptions = data?.subscriptions || []

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-gray-900">Recurring Subscriptions</h2>
        <p className="text-muted text-sm mt-1">Monitor and manage automated deliveries.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <DataTable columns={columns} data={subscriptions} searchKey="user.name" />
        )}
      </div>
    </div>
  )
}
