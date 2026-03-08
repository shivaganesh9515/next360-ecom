'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { DataTable } from '@next360/ui/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@next360/ui/Button'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function CategoriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => adminService.getCategories()
  })

  const columns: any[] = [
    {
      accessorKey: 'name',
      header: 'Category Name',
      cell: (row: any) => <span className="font-semibold text-text">{row.name}</span>
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: (row: any) => <span className="text-muted font-mono text-sm">{row.slug}</span>
    },
    {
      id: 'actions',
      cell: (row: any) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-muted hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-muted hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const categories = data?.categories || []

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-text">Categories</h2>
          <p className="text-muted text-sm mt-1">Manage product classification.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
           <div className="p-12 flex justify-center">
             <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
           </div>
        ) : (
          <DataTable columns={columns} data={categories} searchKey="name" />
        )}
      </div>
    </div>
  )
}
