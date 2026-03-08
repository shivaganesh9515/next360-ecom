import React from 'react'
import { cn } from '@next360/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'organic' | 'fresh' | 'sale' | 'new' | 'certified' |
            'pending' | 'active' | 'suspended' |
            'success' | 'error' | 'warning' | 'info' | 'live'
  size?: 'sm' | 'md'
  dot?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'info', size = 'sm', dot = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1 font-sans font-semibold uppercase tracking-wide rounded-full'

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-3 py-1 text-xs',
    }

    const variants = {
      organic:    'bg-primary/10 text-primary',
      fresh:      'bg-secondary/10 text-secondary',
      sale:       'bg-accent/10 text-accent',
      new:        'bg-blue-50 text-blue-600',
      certified:  'bg-green-50 text-green-700',
      pending:    'bg-yellow-50 text-yellow-700',
      active:     'bg-green-50 text-green-700',
      suspended:  'bg-red-50 text-red-600',
      success:    'bg-green-50 text-green-700',
      error:      'bg-red-50 text-red-600',
      warning:    'bg-yellow-50 text-yellow-700',
      info:       'bg-blue-50 text-blue-600',
      live:       'bg-green-50 text-green-700',
    }

    const dotColors: Record<string, string> = {
      organic:   'bg-primary',
      fresh:     'bg-secondary',
      active:    'bg-green-500',
      live:      'bg-green-500',
      success:   'bg-green-500',
      certified: 'bg-green-500',
      pending:   'bg-yellow-500',
      warning:   'bg-yellow-500',
      sale:      'bg-accent',
      error:     'bg-red-500',
      suspended: 'bg-red-500',
      new:       'bg-blue-500',
      info:      'bg-blue-500',
    }

    const showDot = dot || variant === 'live' || variant === 'active'
    const isPulsing = variant === 'live' || variant === 'active'

    return (
      <span
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {showDot && (
          <span className="relative flex h-2 w-2">
            {isPulsing && (
              <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotColors[variant])} />
            )}
            <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
          </span>
        )}
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
