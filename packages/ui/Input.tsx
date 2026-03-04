import React from 'react'
import { cn } from '@next360/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'error' | 'success'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const activeVariant = error ? 'error' : variant

    const variants = {
      default: 'border-border focus:border-secondary focus:ring-secondary/20',
      error: 'border-red-400 focus:border-red-400 focus:ring-red-100',
      success: 'border-green-400 focus:border-green-400 focus:ring-green-100',
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative w-full text-text">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2',
              variants[activeVariant],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
        {hint && !error && <p className="text-xs text-muted mt-0.5">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
