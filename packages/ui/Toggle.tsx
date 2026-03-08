"use client"

import React from 'react'
import { cn } from '@next360/utils'

export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  variant?: 'light' | 'dark'
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  variant = 'light',
  className,
  ...props
}) => {
  const sizes = {
    sm: { track: 'w-9 h-5', thumb: 'w-4 h-4', translate: 'translate-x-4' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-[22px]' },
  }

  const trackBg = checked
    ? 'bg-secondary'
    : 'bg-gray-200'

  return (
    <label className={cn('inline-flex items-center gap-3', disabled && 'opacity-50 cursor-not-allowed', !disabled && 'cursor-pointer', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
          sizes[size].track,
          trackBg
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block transform rounded-full bg-white shadow-sm transition-transform duration-200',
            sizes[size].thumb,
            checked ? sizes[size].translate : 'translate-x-1'
          )}
        />
      </button>
      {label && (
        <span className={cn(
          'text-sm font-sans',
          variant === 'dark' ? 'text-white/90' : 'text-text'
        )}>
          {label}
        </span>
      )}
    </label>
  )
}
