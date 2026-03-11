import React from 'react'
import { cn } from '@next360/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: string
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'p-6', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl border border-border shadow-card overflow-hidden transition-all duration-200',
          hover && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5',
          padding,
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
