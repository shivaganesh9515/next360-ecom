import React from 'react'
import { cn } from '@next360/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
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
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md',
      secondary: 'bg-secondary text-white hover:bg-secondary/90',
      ghost: 'bg-transparent text-primary hover:bg-primary/8',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg h-8',
      md: 'px-5 py-2.5 text-sm rounded-xl h-10',
      lg: 'px-7 py-3 text-base rounded-xl h-12',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'font-sans font-medium inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'
