import React from 'react'
import { cn } from '@next360/utils'

export interface SkeletonProps {
  className?: string
  circle?: boolean
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, circle }) => {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#e8e0d0] via-[#f5f0e8] to-[#e8e0d0] bg-[length:200%_100%] animate-shimmer',
        circle ? 'rounded-full' : 'rounded-lg',
        className
      )}
    />
  )
}
