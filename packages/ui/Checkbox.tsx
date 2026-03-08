"use client"

import React from 'react'
import { cn } from '@next360/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  variant?: 'light' | 'dark'
}

export const Checkbox = ({
  className,
  label,
  checked,
  onChange,
  error,
  disabled,
  variant = 'light',
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={cn(
          'flex items-center gap-3 cursor-pointer select-none group',
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
              'w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center',
              checked
                ? 'bg-secondary border-secondary'
                : error
                ? 'border-red-400'
                : variant === 'light'
                ? 'border-border bg-white group-hover:border-secondary/50'
                : 'border-white/30 bg-white/5 group-hover:border-white/50',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-secondary peer-focus-visible:ring-offset-2'
            )}
          >
            {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
        </div>
        {label && (
          <span className={cn(
            'text-sm font-sans',
            variant === 'dark' ? 'text-white/90' : 'text-text'
          )}>
            {label}
          </span>
        )}
      </label>
      {error && <p className="text-xs text-red-500 font-sans">{error}</p>}
    </div>
  )
}
