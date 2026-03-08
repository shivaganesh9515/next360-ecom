import React from 'react'
import { cn } from '@next360/utils'
import { Spinner } from './Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
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
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2',
      'font-sans font-medium whitespace-nowrap',
      'cursor-pointer select-none',
      'transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
    ].join(' ')

    const variants = {
      primary: [
        'bg-primary text-white',
        'hover:bg-primary/90',
        'shadow-sm hover:shadow-md',
        'active:scale-[0.98]',
      ].join(' '),
      secondary: [
        'bg-secondary text-white',
        'hover:bg-secondary/90',
        'active:scale-[0.98]',
      ].join(' '),
      ghost: [
        'bg-transparent text-primary',
        'hover:bg-primary/[0.08] hover:text-primary',
      ].join(' '),
      danger: [
        'bg-red-600 text-white',
        'hover:bg-red-700',
        'active:scale-[0.98]',
      ].join(' '),
      outline: [
        'border-2 border-primary text-primary bg-transparent',
        'hover:bg-primary hover:text-white',
        'active:scale-[0.98]',
      ].join(' '),
      icon: [
        'bg-transparent text-muted',
        'hover:bg-primary/[0.08] hover:text-primary',
        'rounded-xl aspect-square !p-0',
      ].join(' '),
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg h-8',
      md: 'px-5 py-2.5 text-sm rounded-xl h-10',
      lg: 'px-7 py-3 text-base rounded-xl h-12',
    }

    const iconSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          variant === 'icon' ? iconSizes[size] : sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'white'} className="mr-1" />}
        {!isLoading && leftIcon}
        {isLoading ? <span>Loading...</span> : children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'
