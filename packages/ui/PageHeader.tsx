import React from 'react'
import { cn } from '@next360/utils'
import { ChevronRight } from 'lucide-react'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}) => {
  return (
    <div className={cn('pb-6 mb-8 border-b border-border', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-3 text-sm font-sans">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight size={14} className="text-muted" />}
              {crumb.href ? (
                <a href={crumb.href} className={cn('hover:underline transition-colors', i === breadcrumbs.length - 1 ? 'text-text font-medium' : 'text-muted hover:text-primary')}>
                  {crumb.label}
                </a>
              ) : (
                <span className={cn(i === breadcrumbs.length - 1 ? 'text-text font-medium' : 'text-muted')}>
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted font-sans">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}
