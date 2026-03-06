'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { vendorService } from '../../../services/vendorService'
import { DataTable } from '@next360/ui/DataTable'
import { Button, Badge } from '@next360/ui'
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'

export default function VendorProductsPage() {
  const queryClient = useQueryClient()

  const { data: products, isLoading } = useQuery({
    queryKey: ['vendor-products'],
    queryFn: () => vendorService.getMyProducts(),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => vendorService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-products'] })
      toast.success('Product deleted successfully')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to delete product')
    },
  })

  // Simulated fallback data while backend is disconnected
  const mockProducts = [
    { id: '1', name: 'Organic Apples', price: 15000, stockCount: 45, approvalStatus: 'ACTIVE', images: ['https://placehold.co/100x100'] },
    { id: '2', name: 'Farm Fresh Tomatoes', price: 8000, stockCount: 12, approvalStatus: 'PENDING_REVIEW', images: ['https://placehold.co/100x100'] },
    { id: '3', name: 'Raw Honey 1L', price: 45000, stockCount: 0, approvalStatus: 'REJECTED', images: ['https://placehold.co/100x100'] },
  ]

  const dataToDisplay = products?.data || mockProducts

  const columns: any[] = [
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }: any) => (
        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
          {row.images?.[0] ? (
            <Image src={row.images[0]} alt={row.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
          )}
        </div>
      )
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }: any) => <span className="font-medium text-gray-900">{row.name}</span>
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }: any) => `₹${(row.price / 100).toLocaleString('en-IN')}`
    },
    {
      accessorKey: 'stockCount',
      header: 'Stock',
      cell: ({ row }: any) => (
        <Badge variant={row.stockCount > 10 ? 'active' : row.stockCount > 0 ? 'warning' : 'error'}>
          {row.stockCount} in stock
        </Badge>
      )
    },
    {
      accessorKey: 'approvalStatus',
      header: 'Status',
      cell: ({ row }: any) => {
        const statuses: Record<string, string> = {
          ACTIVE: 'bg-green-100 text-green-800 border-green-200',
          PENDING_REVIEW: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          REJECTED: 'bg-red-100 text-red-800 border-red-200',
        }
        return (
          <Badge className={statuses[row.approvalStatus] || 'bg-gray-100'} variant="info">
            {row.approvalStatus}
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/products/${row.id}`}>
            <Button variant="ghost" size="sm"><Edit className="w-4 h-4 text-blue-600" /></Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => confirm('Delete product?') && deleteMutation.mutate(row.id)}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      )
    }
  ]

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Products</h1>
          <p className="text-gray-500 text-sm">Manage your inventory, prices, and listings.</p>
        </div>
        <Link href="/products/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={dataToDisplay}
          searchKey="name"
        />
      </div>
    </div>
  )
}
