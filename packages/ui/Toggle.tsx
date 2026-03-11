import React from 'react'
import { cn } from '@next360/utils'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: 'sm' | 'md'
  disabled?: boolean
  className?: string
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  size = 'md',
  disabled = false,
  className
}) => {
  const sizes = {
    sm: { track: 'w-10 h-6', thumb: 'w-4.5 h-4.5', translate: 'translate-x-4' },
    md: { track: 'w-13 h-7', thumb: 'w-5.5 h-5.5', translate: 'translate-x-6' }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-all duration-300 ease-in-out focus:outline-none',
        checked ? 'bg-primary' : 'bg-slate-200', // Green for active
        disabled && 'opacity-50 cursor-not-allowed',
        sizes[size].track,
        className
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out mt-0.5 ml-0.75',
          sizes[size].thumb,
          checked ? sizes[size].translate : 'translate-x-0'
        )}
      />
    </button>
  )
}
