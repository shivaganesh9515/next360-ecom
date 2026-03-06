'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { ChevronRight, Search, Filter } from 'lucide-react'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { useState } from 'react'
import { format } from 'date-fns'
import { OrderStatusBadge } from '../../components/orders/OrderStatusBadge'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', statusFilter],
    queryFn: () => adminService.getOrders(statusFilter !== 'ALL' ? { status: statusFilter } : {})
  })

  const columns: any[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: (row: any) => <span className="font-mono text-sm font-medium">#{row.id.slice(-8).toUpperCase()}</span>,
    },
    {
      accessorKey: 'user.name',
      header: 'Customer',
      cell: (row: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.user?.name || 'Guest'}</span>
          <span className="text-xs text-muted">{row.user?.email || ''}</span>
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: (row: any) => <span className="text-sm text-gray-600">{format(new Date(row.createdAt), 'MMM d, yyyy HH:mm')}</span>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: (row: any) => <span className="font-medium text-gray-900">₹{row.total.toLocaleString()}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: any) => <OrderStatusBadge status={row.status} />,
    },
    {
      id: 'actions',
      header: '',
      cell: (row: any) => (
        <Link 
          href={`/orders/${row.id}`}
          className="p-2 text-gray-400 hover:text-primary transition-colors flex justify-end"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ),
    },
  ]

  const orders = data?.orders || []
  
  // Local filtering by search term (ID or User Name/Email)
  const filteredOrders = orders.filter((o: any) => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-semibold text-gray-900">Orders</h2>
        <p className="text-muted text-sm mt-1">Manage and track customer orders across the platform.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative max-w-md w-full flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input 
                placeholder="Search orders..." 
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-4 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all bg-white"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white">Export CSV</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 pl-6 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={filteredOrders} 
            searchKey=""
          />
        )}
      </div>
    </div>
  )
}
