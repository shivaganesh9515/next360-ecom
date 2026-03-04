import React from 'react'
import { cn } from '@next360/utils'

export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    sm: { track: 'w-9 h-5', thumb: 'w-4 h-4', translate: 'translate-x-4' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
  }

  return (
    <label className={cn('inline-flex items-center gap-2', disabled && 'opacity-50 cursor-not-allowed', !disabled && 'cursor-pointer', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
          sizes[size].track,
          checked ? 'bg-secondary' : 'bg-gray-300'
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block transform rounded-full bg-white shadow transition duration-200 ease-in-out',
            sizes[size].thumb,
            checked ? sizes[size].translate : 'translate-x-1'
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-text">{label}</span>}
    </label>
  )
}
