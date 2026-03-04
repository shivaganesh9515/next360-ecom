import React from 'react'
import { cn } from '@next360/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  lines = 1,
  style,
  ...props
}) => {
  const baseClass = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer'

  const variants = {
    text: 'rounded h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClass, variants.text, i === lines - 1 && 'w-[60%]', className)}
            style={{ width: i === lines - 1 && typeof width === 'string' ? `calc(${width} * 0.6)` : width, height, ...style }}
            {...props}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(baseClass, variants[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  )
}
