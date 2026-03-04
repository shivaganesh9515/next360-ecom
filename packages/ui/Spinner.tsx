import React from 'react'
import { cn } from '@next360/utils'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'muted'
}

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = 'md',
  color = 'primary',
  ...props
}) => {
  const baseClass = 'inline-block rounded-full border-2 animate-spin border-t-transparent'

  const sizes = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base',
  }

  const colors = {
    primary: 'border-primary',
    white: 'border-white',
    muted: 'border-muted',
  }

  return (
    <div
      className={cn(baseClass, sizes[size], colors[color], className)}
      {...props}
    />
  )
}
