import { cn } from '@/lib/utils'
import { forwardRef, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-[2rem] border', className)}
      {...props}
    >
      {children}
    </div>
  )
)
Card.displayName = 'Card'
