import React from 'react'
import { cn } from '@next360/utils'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('py-16 text-center flex flex-col items-center gap-4', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
          <div className="w-8 h-8 text-secondary">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-xl font-display font-semibold text-text">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted max-w-xs mx-auto">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
