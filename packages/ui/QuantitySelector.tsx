"use client"

import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@next360/utils'

export interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'md',
  className,
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1)
  }

  const handleIncrement = () => {
    if (value < max) onChange(value + 1)
  }

  const sizes = {
    sm: { button: 'w-8 h-8', icon: 'w-3 h-3', text: 'text-sm' },
    md: { button: 'w-9 h-9', icon: 'w-4 h-4', text: 'text-sm' },
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-xl border border-border bg-white',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={cn(
          'flex items-center justify-center hover:bg-cream active:bg-cream/60 transition-colors',
          'disabled:opacity-30 disabled:cursor-not-allowed',
          sizes[size].button
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={sizes[size].icon} />
      </button>

      <div className={cn('px-4 font-semibold font-sans text-text border-x border-border', sizes[size].text)}>
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={cn(
          'flex items-center justify-center hover:bg-cream active:bg-cream/60 transition-colors',
          'disabled:opacity-30 disabled:cursor-not-allowed',
          sizes[size].button
        )}
        aria-label="Increase quantity"
      >
        <Plus className={sizes[size].icon} />
      </button>
    </div>
  )
}
