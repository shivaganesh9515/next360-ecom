"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { Check } from 'lucide-react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
          'flex items-center gap-3 cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
            {...props}
          />
          <div
            className={cn(
              'w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center',
              checked
                ? 'bg-secondary border-secondary'
                : error
                ? 'border-red-400'
                : 'border-muted'
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
          </div>
        </div>
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
