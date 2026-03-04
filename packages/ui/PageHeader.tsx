import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@next360/utils'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  action?: React.ReactNode
  description?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  action,
  description,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8', className)} {...props}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-muted mb-2">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-text font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        
        <h1 className="font-display text-2xl md:text-3xl font-bold text-text">{title}</h1>
        
        {description && (
          <p className="text-muted mt-1">{description}</p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-3 shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
