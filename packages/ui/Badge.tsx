import React from 'react'
import { cn } from '@next360/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 
    | 'green' | 'amber' | 'indigo' | 'red' | 'slate'
    | 'organic' | 'fresh' | 'sale' | 'new' | 'certified' 
    | 'pending' | 'active' | 'suspended' | 'rythu' | 'eco' | 'info' | 'success'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'green', 
  size = 'md',
  className,
  ...props 
}) => {
  const variantMap: Record<string, string> = {
    // Legacy Mappings
    organic:   'bg-primary/10 text-primary',
    fresh:     'bg-secondary/10 text-secondary',
    sale:      'bg-accent/10 text-accent',
    new:       'bg-blue-50 text-blue-600',
    certified: 'bg-green-50 text-green-700',
    pending:   'bg-yellow-50 text-yellow-700',
    active:    'bg-green-50 text-green-700',
    suspended: 'bg-red-50 text-red-600',
    rythu:     'bg-red-50 text-[#C0392B]',
    eco:       'bg-blue-50 text-[#1B6CA8]',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 font-sans font-bold rounded-full uppercase tracking-wider',
        variantMap[variant as string] || variantMap.green,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
