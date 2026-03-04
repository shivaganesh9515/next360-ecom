import React from 'react'
import { cn, formatPrice, calculateDiscountPercent } from '@next360/utils'

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number
  originalPrice?: number
  size?: 'sm' | 'md' | 'lg'
  showDiscount?: boolean
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size = 'md',
  showDiscount = true,
  className,
  ...props
}) => {
  const sizes = {
    sm: { price: 'text-base', original: 'text-xs', badge: 'text-[10px] px-1.5 py-0.5' },
    md: { price: 'text-lg', original: 'text-sm', badge: 'text-xs px-2 py-0.5' },
    lg: { price: 'text-2xl', original: 'text-base', badge: 'text-sm px-2 py-1' },
  }

  const hasDiscount = originalPrice && originalPrice > price
  const discountPercent = hasDiscount ? calculateDiscountPercent(originalPrice, price) : 0

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)} {...props}>
      <span className={cn('font-bold text-primary', sizes[size].price)}>
        {formatPrice(price)}
      </span>
      
      {hasDiscount && (
        <span className={cn('text-muted line-through', sizes[size].original)}>
          {formatPrice(originalPrice)}
        </span>
      )}
      
      {hasDiscount && showDiscount && discountPercent > 0 && (
        <span className={cn(
          'font-medium bg-accent/10 text-accent rounded-full',
          sizes[size].badge
        )}>
          -{discountPercent}%
        </span>
      )}
    </div>
  )
}
