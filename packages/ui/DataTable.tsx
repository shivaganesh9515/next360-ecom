"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { Skeleton } from './Skeleton'
import { Search } from 'lucide-react'
import { Input } from './Input'

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
}

export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  isLoading,
  searchPlaceholder = 'Search...',
  onSearch,
  pagination,
  emptyState,
}: DataTableProps<T>) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-border shadow-card overflow-hidden">
      {onSearch && (
        <div className="p-4 border-b border-border bg-gray-50/50">
          <Input
            placeholder={searchPlaceholder}
            className="max-w-xs"
            leftIcon={<Search className="w-4 h-4" />}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream/50">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider border-b border-border"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, ridx) => (
                <tr key={ridx}>
                  {columns.map((_, cidx) => (
                    <td key={cidx} className="px-6 py-4">
                      <Skeleton variant="text" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((item, ridx) => (
                <tr key={ridx} className="hover:bg-primary/5 transition-colors odd:bg-white even:bg-cream/20">
                  {columns.map((col, cidx) => (
                    <td key={cidx} className="px-6 py-4 text-sm text-text">
                      {col.cell ? col.cell(item) : item[col.accessorKey as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  {emptyState || <span className="text-muted italic">No data found</span>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && data.length > 0 && (
        <div className="p-4 border-t border-border bg-gray-50/50 flex items-center justify-between">
          <span className="text-sm text-muted">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </span>
          <div className="flex gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() => pagination.onChange(pagination.page - 1)}
              className="px-3 py-1 text-sm border border-border rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
            >
              Prev
            </button>
            <button
              disabled={pagination.page * pagination.limit >= pagination.total}
              onClick={() => pagination.onChange(pagination.page + 1)}
              className="px-3 py-1 text-sm border border-border rounded-lg disabled:opacity-50 hover:bg-white transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
