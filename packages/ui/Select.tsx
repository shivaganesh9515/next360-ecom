"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: Array<{ label: string; value: string | number }>
  variant?: 'light' | 'dark'
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, variant = 'light', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    const baseStyles = [
      'w-full px-4 py-2.5 rounded-xl text-sm font-sans appearance-none',
      'transition-all duration-200',
      'focus:outline-none',
      'cursor-pointer',
    ].join(' ')

    const lightStyles = error
      ? 'bg-white border border-red-400 text-text focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'bg-white border border-border text-text focus:border-secondary focus:ring-2 focus:ring-secondary/20'

    const darkStyles = error
      ? 'bg-white/5 border border-red-400 text-white focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'bg-white/5 border border-white/20 text-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium font-sans',
              variant === 'light' ? 'text-text' : 'text-white/80'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(baseStyles, variant === 'light' ? lightStyles : darkStyles, className)}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="bg-white text-text">
                {option.label}
              </option>
            ))}
          </select>
          <div className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none',
            variant === 'light' ? 'text-muted' : 'text-white/50'
          )}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-red-500 mt-0.5 font-sans">{error}</p>}
        {hint && !error && <p className={cn('text-xs mt-0.5 font-sans', variant === 'light' ? 'text-muted' : 'text-white/50')}>{hint}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
