'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MoreHorizontal, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { useState } from 'react'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => adminService.getProducts()
  })

  const columns: any[] = [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: (row: any) => {
        const product = row.original
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-border overflow-hidden shrink-0">
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 leading-tight">{product.name}</span>
              <span className="text-xs text-muted mt-0.5">{product.sku}</span>
            </div>
          </div>
        )
      }
    },
    {
      accessorKey: 'category.name',
      header: 'Category',
      cell: (row: any) => <span className="text-sm text-gray-600">{row.category?.name || '-'}</span>
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (row: any) => <span className="font-medium text-gray-900">₹{row.price.toLocaleString()}</span>
    },
    {
      accessorKey: 'stock',
      header: 'Inventory',
      cell: (row: any) => {
        const stock = row.stock
        let color = 'text-green-600 bg-green-50'
        if (stock === 0) color = 'text-red-600 bg-red-50'
        else if (stock < 10) color = 'text-yellow-600 bg-yellow-50'
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${color}`}>
            {stock} in stock
          </span>
        )
      }
    },
    {
      accessorKey: 'isPublished',
      header: 'Status',
      cell: (row: any) => {
        const isPublished = row.isPublished
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isPublished ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}`}>
            {isPublished ? 'PUBLISHED' : 'DRAFT'}
          </span>
        )
      }
    },
    {
      id: 'actions',
      cell: (row: any) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/products/${row.id}`} className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
            <Edit className="w-4 h-4" />
          </Link>
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const products = data?.products || []
  
  // Local filtering
  const filteredProducts = products.filter((p: any) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-gray-900">Products</h2>
          <p className="text-muted text-sm mt-1">Manage your catalogue and inventory.</p>
        </div>
        <Link href="/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              placeholder="Search by name or SKU..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-white">
              <Filter className="w-4 h-4" /> Filter
            </Button>
            <Button variant="outline" className="bg-white">Export</Button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 pl-6 flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <DataTable 
            columns={columns} 
            data={filteredProducts} 
            searchKey="" // Search handled locally above
          />
        )}
      </div>
    </div>
  )
}
