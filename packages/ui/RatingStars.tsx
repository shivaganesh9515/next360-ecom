"use client"

import React, { useState } from 'react'
import { cn } from '@next360/utils'

export interface RatingStarsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  rating: number
  maxStars?: number
  interactive?: boolean
  onChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  count?: number
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'sm',
  showCount = false,
  count = 0,
  className,
  ...props
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const currentDisplayRating = hoverRating !== null ? hoverRating : rating

  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <div className="flex" onMouseLeave={() => interactive && setHoverRating(null)}>
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1
          const isFilled = currentDisplayRating >= starValue
          const isHalf = currentDisplayRating >= starValue - 0.5 && currentDisplayRating < starValue

          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={cn(
                sizes[size],
                isFilled || isHalf ? 'text-accent fill-current' : 'text-gray-300',
                interactive && 'cursor-pointer hover:scale-110 transition-transform'
              )}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
            >
              {isHalf ? (
                <defs>
                  <linearGradient id={`half-${index}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>
              ) : null}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                fill={isHalf ? `url(#half-${index})` : (isFilled ? 'currentColor' : 'none')}
                stroke="currentColor"
                strokeWidth={isFilled ? 0 : 1}
              />
            </svg>
          )
        })}
      </div>
      {showCount && <span className="text-xs text-muted ml-1">({count})</span>}
    </div>
  )
}
