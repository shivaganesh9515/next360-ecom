"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
}

export const Checkbox = ({
  className,
  label,
  checked,
  onChange,
  error,
  disabled,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={cn(
          'flex items-center gap-4 cursor-pointer select-none group',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
            {...props}
          />
          <div
            className={cn(
              'w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center',
              checked
                ? 'bg-primary border-primary scale-110'
                : error
                ? 'border-red-500'
                : 'border-slate-200 bg-slate-50 group-hover:border-slate-300',
            )}
          >
            {checked && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium text-slate-700">
            {label}
          </span>
        )}
      </label>
      {error && <p className="text-xs text-red-500 ml-10">{error}</p>}
    </div>
  )
}
