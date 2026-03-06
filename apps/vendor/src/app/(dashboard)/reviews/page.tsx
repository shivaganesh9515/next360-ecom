'use client'

import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../../services/vendorService'
import { DataTable } from '@next360/ui/DataTable'
import { Card } from '@next360/ui'
import { Star, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

export default function VendorReviewsPage() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['vendor-reviews'],
    queryFn: () => vendorService.getProductReviews(),
  })

  // Simulated mock data
  const mockReviews = [
    { id: '1', productName: 'Organic Apples', customerName: 'Riya S.', rating: 5, comment: 'Absolutely fresh and sweet.', date: '2023-11-20' },
    { id: '2', productName: 'Farm Fresh Tomatoes', customerName: 'Amit K.', rating: 4, comment: 'Good quality, fast delivery.', date: '2023-11-19' },
    { id: '3', productName: 'Raw Honey 1L', customerName: 'Sneha P.', rating: 2, comment: 'Packaging was slightly damaged.', date: '2023-11-15' },
  ]

  const dataToDisplay = reviews?.data || mockReviews

  const columns: any[] = [
    { accessorKey: 'productName', header: 'Product' },
    { accessorKey: 'customerName', header: 'Customer' },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }: any) => (
        <div className="flex items-center text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < row.rating ? 'fill-current' : 'text-gray-300'}`} />
          ))}
        </div>
      )
    },
    { accessorKey: 'comment', header: 'Review' },
    { 
      accessorKey: 'date', 
      header: 'Date',
      cell: ({ row }: any) => format(new Date(row.date), 'MMM dd, yyyy')
    },
  ]

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h1>
        <p className="text-gray-500 text-sm">See what customers are saying about your products.</p>
      </div>

      <Card>
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">All Product Reviews</h2>
        </div>
        <div className="p-6">
          <DataTable
            columns={columns}
            data={dataToDisplay}
            searchKey="productName"
          />
        </div>
      </Card>
    </div>
  )
}
