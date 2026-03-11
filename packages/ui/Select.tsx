"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: Array<{ label: string; value: string | number }>
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700 ml-1"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-slate-100 border-none px-5 py-3 rounded-full text-sm font-sans appearance-none cursor-pointer',
              'transition-all duration-300 ring-1 ring-transparent focus:ring-secondary focus:bg-white outline-none',
              error && 'ring-red-500',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-secondary">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
        {error && <p className="text-xs text-red-500 ml-4">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
