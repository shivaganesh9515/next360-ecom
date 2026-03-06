'use client'

import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../../services/vendorService'
import { DataTable } from '@next360/ui/DataTable'
import { Button, Badge } from '@next360/ui'
import { Eye, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

export default function VendorOrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['vendor-orders'],
    queryFn: () => vendorService.getMyOrders(),
  })

  const mockOrders = [
    { id: 'ORD-1001', customerName: 'Riya Singh', totalItems: 3, amount: 45000, status: 'PENDING', createdAt: new Date() },
    { id: 'ORD-1002', customerName: 'Amit Kumar', totalItems: 1, amount: 15000, status: 'PROCESSING', createdAt: new Date(Date.now() - 86400000) },
    { id: 'ORD-1003', customerName: 'Sneha Patel', totalItems: 5, amount: 125000, status: 'DELIVERED', createdAt: new Date(Date.now() - 86400000 * 2) },
  ]

  const dataToDisplay = orders?.data || mockOrders

  const columns: any[] = [
    {
      accessorKey: 'id',
      header: 'Order Number',
      cell: ({ row }: any) => <span className="font-medium text-green-700">{row.id}</span>
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }: any) => format(new Date(row.createdAt), 'MMM dd, yyyy')
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
    },
    {
      accessorKey: 'totalItems',
      header: 'Your Items',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => `₹${(row.amount / 100).toLocaleString('en-IN')}`
    },
    {
      accessorKey: 'status',
      header: 'Fulfillment',
      cell: ({ row }: any) => {
        const statuses: Record<string, string> = {
          PENDING: 'bg-yellow-100 text-yellow-800',
          PROCESSING: 'bg-blue-100 text-blue-800',
          SHIPPED: 'bg-purple-100 text-purple-800',
          DELIVERED: 'bg-green-100 text-green-800',
          CANCELLED: 'bg-red-100 text-red-800',
        }
        return (
          <Badge className={statuses[row.status] || 'bg-gray-100'} variant="info">
            {row.status}
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <Link href={`/orders/${row.id}`}>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-2" /> View
          </Button>
        </Link>
      )
    }
  ]

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm">Manage fulfillments for products purchased from your store.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={dataToDisplay}
          searchKey="id"
        />
      </div>
    </div>
  )
}
