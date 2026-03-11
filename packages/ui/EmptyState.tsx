import React from 'react'
import { cn } from '@next360/utils'

export interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn('py-16 text-center flex flex-col items-center gap-4 font-sans', className)}>
      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
        {icon || <span className="text-4xl">🌾</span>}
      </div>
      <h3 className="text-xl font-display font-semibold text-text">{title}</h3>
      {description && <p className="text-sm text-muted max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
