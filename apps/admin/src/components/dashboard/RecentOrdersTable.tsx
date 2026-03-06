'use client'

import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface RecentOrdersTableProps {
  data: any[]
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
}

export function RecentOrdersTable({ data }: RecentOrdersTableProps) {
  const columns: any[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: (row: any) => <span className="font-mono text-sm">#{row.id.slice(-6).toUpperCase()}</span>,
    },
    {
      accessorKey: 'user.name',
      header: 'Customer',
      cell: (row: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.user?.name || 'Guest'}</span>
          <span className="text-xs text-gray-500">{row.user?.email || ''}</span>
        </div>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: (row: any) => <span className="text-sm text-gray-600">{format(new Date(row.createdAt), 'MMM d, yyyy')}</span>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: (row: any) => <span className="font-medium">₹{row.total.toLocaleString()}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row: any) => {
        const status = row.status
        const color = statusColors[status] || 'bg-gray-100 text-gray-800'
        return (
          <span className={`px-2.5 py-1 pt-1.5 text-xs font-semibold rounded-full uppercase tracking-wider ${color}`}>
            {status}
          </span>
        )
      },
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <Link href="/orders" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>
      <DataTable columns={columns} data={data.slice(0, 5)} searchKey="" />
    </div>
  )
}
