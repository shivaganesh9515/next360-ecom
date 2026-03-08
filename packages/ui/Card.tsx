import React from 'react'
import { cn } from '@next360/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  variant?: 'light' | 'dark'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'md', hover = false, variant = 'light', children, ...props }, ref) => {

    const variants = {
      light: 'bg-white border border-border shadow-card',
      dark: 'bg-primary text-white border border-white/10',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-5 md:p-6',
      lg: 'p-7 md:p-8',
    }

    const hoverStyles = hover
      ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200'
      : 'transition-all duration-200'

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl overflow-hidden',
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'
