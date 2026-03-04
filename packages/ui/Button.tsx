import React from 'react'
import { cn } from '@next360/utils'
import { Spinner } from './Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-secondary'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-opacity-90 active:scale-[0.98]',
      secondary: 'bg-secondary text-white hover:bg-opacity-90',
      ghost: 'bg-transparent text-primary hover:bg-primary hover:bg-opacity-10',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-5 py-2.5 text-sm h-10',
      lg: 'px-7 py-3 text-base h-12',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Spinner size="sm" color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'white'} className="mr-2" />}
        {!isLoading && leftIcon}
        <span className={cn(isLoading && 'opacity-0')}>{children}</span>
        {!isLoading && rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'
