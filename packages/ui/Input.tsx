import React from 'react'
import { cn } from '@next360/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'light' | 'dark'
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
      variant = 'light',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    const baseInputStyles = [
      'w-full px-4 py-2.5 rounded-xl text-sm font-sans',
      'transition-all duration-200',
      'focus:outline-none',
      'placeholder:text-muted',
    ].join(' ')

    const lightStyles = error
      ? 'bg-white border border-red-400 text-text focus:border-red-400 focus:ring-2 focus:ring-red-100'
      : 'bg-white border border-border text-text focus:border-secondary focus:ring-2 focus:ring-secondary/20'

    const darkStyles = error
      ? 'bg-white/5 border border-red-400 text-white focus:border-red-400 focus:ring-2 focus:ring-red-100 placeholder:text-white/40'
      : 'bg-white/5 border border-white/20 text-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 placeholder:text-white/40'

    const activeStyles = variant === 'light' ? lightStyles : darkStyles

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
        <div className="relative w-full">
          {leftIcon && (
            <div className={cn(
              'absolute left-3.5 top-1/2 -translate-y-1/2',
              variant === 'light' ? 'text-muted' : 'text-white/50'
            )}>
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseInputStyles,
              activeStyles,
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className={cn(
              'absolute right-3.5 top-1/2 -translate-y-1/2',
              variant === 'light' ? 'text-muted' : 'text-white/50'
            )}>
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-0.5 font-sans">{error}</p>}
        {hint && !error && <p className={cn('text-xs mt-0.5 font-sans', variant === 'light' ? 'text-muted' : 'text-white/50')}>{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
