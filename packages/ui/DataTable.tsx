"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { Skeleton } from './Skeleton'
import { Search } from 'lucide-react'
import { Input } from './Input'
import { Button } from './Button'

interface ColumnDef<T> {
  header: string
  accessorKey: keyof T | string
  cell?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  searchPlaceholder?: string
  searchKey?: string
  onSearch?: (query: string) => void
  pagination?: {
    page: number
    total: number
    limit: number
    onChange: (page: number) => void
  }
  emptyState?: React.ReactNode
  className?: string
}

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  isLoading,
  searchPlaceholder = 'Search...',
  onSearch,
  pagination,
  emptyState,
  className,
}: DataTableProps<T>) => {
  return (
    <div className={cn('w-full bg-white rounded-2xl border border-border shadow-card overflow-hidden', className)}>
      {onSearch && (
        <div className="p-4 border-b border-border bg-white">
          <div className="max-w-xs">
            <Input
              placeholder={searchPlaceholder}
              leftIcon={<Search className="w-4 h-4" />}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream/60">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide border-b border-border text-muted font-sans"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, ridx) => (
                <tr key={ridx} className="even:bg-cream/20">
                  {columns.map((_, cidx) => (
                    <td key={cidx} className="px-6 py-4">
                      <Skeleton rounded="md" className="h-4 w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, ridx) => (
                <tr
                  key={ridx}
                  className="transition-colors duration-150 hover:bg-cream/40 even:bg-cream/20"
                >
                  {columns.map((col, cidx) => (
                    <td key={cidx} className="px-6 py-4 text-sm font-medium text-text font-sans">
                      {col.cell ? col.cell(item) : item[col.accessorKey as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16">
                  {emptyState || (
                    <div className="text-center text-sm text-muted font-sans">
                      No records found
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && data.length > 0 && (
        <div className="p-4 border-t border-border flex items-center justify-between bg-white">
          <span className="text-sm text-muted font-sans">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onChange(pagination.page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page * pagination.limit >= pagination.total}
              onClick={() => pagination.onChange(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
