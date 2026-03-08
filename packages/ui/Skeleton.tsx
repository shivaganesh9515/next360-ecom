import React from 'react'
import { cn } from '@next360/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none'
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'light', rounded = 'md', ...props }, ref) => {
    const roundedMap = {
      none: 'rounded-none',
      sm: 'rounded-lg',
      md: 'rounded-xl',
      lg: 'rounded-2xl',
      full: 'rounded-full',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded bg-gradient-to-r from-[#e8e0d0] via-[#f5f0e8] to-[#e8e0d0]',
          'bg-[length:200%_100%] animate-shimmer',
          roundedMap[rounded],
          className
        )}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'
