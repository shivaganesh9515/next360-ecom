import React from 'react'
import { cn } from '@next360/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'organic' | 'fresh' | 'sale' | 'new' | 'certified' | 
            'pending' | 'active' | 'suspended' | 
            'success' | 'error' | 'warning' | 'info'
  size?: 'sm' | 'md'
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'info', size = 'sm', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full'
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    }

    const variants = {
      organic: 'bg-primary/10 text-primary',
      fresh: 'bg-secondary/10 text-secondary',
      sale: 'bg-accent/10 text-accent',
      new: 'bg-blue-50 text-blue-600',
      certified: 'bg-green-50 text-green-700',
      pending: 'bg-yellow-50 text-yellow-700',
      active: 'bg-green-50 text-green-700',
      suspended: 'bg-red-50 text-red-600',
      success: 'bg-green-50 text-green-700',
      error: 'bg-red-50 text-red-600',
      warning: 'bg-yellow-50 text-yellow-700',
      info: 'bg-blue-50 text-blue-600',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
