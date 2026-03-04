import React from 'react'
import { cn } from '@next360/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'md', hover = false, children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-2xl border border-border shadow-card'
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
    }

    const hoverStyles = hover ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200' : ''

    return (
      <div
        ref={ref}
        className={cn(baseStyles, paddings[padding], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'
