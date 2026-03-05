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
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const sizes = {
    sm: { container: 'h-8 text-sm', button: 'w-8', icon: 'w-3 h-3' },
    md: { container: 'h-10 text-base', button: 'w-10', icon: 'w-4 h-4' },
  }

  return (
    <div
      className={cn(
        'inline-flex items-center border border-border rounded-xl overflow-hidden bg-white',
        disabled && 'opacity-50 pointer-events-none',
        sizes[size].container,
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={cn(
          'flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          sizes[size].button,
          'h-full border-r border-border'
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={sizes[size].icon} />
      </button>

      <div className="flex-1 flex items-center justify-center font-medium min-w-[3rem]">
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={cn(
          'flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          sizes[size].button,
          'h-full border-l border-border'
        )}
        aria-label="Increase quantity"
      >
        <Plus className={sizes[size].icon} />
      </button>
    </div>
  )
}
