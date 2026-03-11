import React from 'react'
import { cn } from '@next360/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

export interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  title?: string
  actions?: React.ReactNode
  variant?: 'light' | 'noir'
  isLoading?: boolean
  pagination?: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
}
 
export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  actions,
  variant = 'light',
  isLoading,
  pagination
}: DataTableProps<T>) {
  const isNoir = variant === 'noir'
 
  return (
    <div className={cn(
      "rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500",
      isNoir 
        ? "bg-slate-900/40 backdrop-blur-3xl border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.4)]" 
        : "bg-white border border-slate-100 shadow-slate-200/50"
    )}>
      {(title || actions) && (
        <div className={cn(
          "px-10 py-8 border-b flex items-center justify-between gap-6 flex-wrap",
          isNoir ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/30"
        )}>
          {title && <h2 className={cn("text-2xl font-black tracking-tighter italic", isNoir ? "text-white" : "text-slate-900")}>{title}</h2>}
          <div className="flex-1 flex justify-end gap-3">{actions}</div>
        </div>
      )}
 
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={isNoir ? "bg-white/[0.01]" : "bg-white"}>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn(
                    'px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em]',
                    isNoir ? "text-slate-500 border-b border-white/5" : "text-slate-400 border-b border-slate-100",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cn("divide-y", isNoir ? "divide-white/5" : "divide-slate-50")}>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-10 py-6">
                      <div className={cn("h-4 rounded-full w-full opacity-50", isNoir ? "bg-white/10" : "bg-slate-100")} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-10 py-24 text-center text-slate-500 font-black uppercase tracking-widest text-xs italic">
                  Registry Void: No Nodes Detected
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className={cn(
                  "transition-all duration-300 group",
                  isNoir ? "hover:bg-white/[0.03]" : "hover:bg-slate-50/80"
                )}>
                  {columns.map((col, idx) => (
                    <td key={idx} className={cn(
                      'px-10 py-6 text-sm font-bold transition-colors', 
                      isNoir ? "text-slate-400 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900",
                      col.className
                    )}>
                      {typeof col.accessor === 'function' ? col.accessor(item) : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
           </tbody>
        </table>
      </div>
 
      {pagination && (
        <div className={cn(
          "px-10 py-6 border-t flex items-center justify-between",
          isNoir ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/30"
        )}>
          <p className={cn("text-[10px] font-black uppercase tracking-widest", isNoir ? "text-slate-500" : "text-slate-400")}>
            Terminal Sequence <span className="text-primary italic">{pagination.currentPage}</span> / <span className={isNoir ? "text-white" : "text-slate-900"}>{pagination.totalPages}</span>
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "w-10 h-10 rounded-xl p-0 flex items-center justify-center border transition-all shadow-sm",
                isNoir ? "border-white/10 hover:border-primary hover:text-primary bg-white/5" : "border-slate-200 hover:border-primary hover:text-primary bg-white"
              )}
              disabled={pagination.currentPage <= 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "w-10 h-10 rounded-xl p-0 flex items-center justify-center border transition-all shadow-sm",
                isNoir ? "border-white/10 hover:border-primary hover:text-primary bg-white/5" : "border-slate-200 hover:border-primary hover:text-primary bg-white"
              )}
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
            >
              <ChevronRight size={16} strokeWidth={3} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
