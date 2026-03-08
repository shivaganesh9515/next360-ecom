import React from 'react'
import { cn } from '@next360/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  accentColor?: 'secondary' | 'accent' | 'primary'
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
  accentColor = 'secondary',
  className,
}) => {
  const activeTrend = trend || (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined)

  const accentBorder = {
    secondary: 'border-l-4 border-l-secondary',
    accent: 'border-l-4 border-l-accent',
    primary: 'border-l-4 border-l-primary',
  }

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-border shadow-card p-6 transition-all duration-200',
        accentBorder[accentColor],
        className
      )}
    >
      {/* Top row: icon + label */}
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            {icon}
          </div>
        )}
        <span className="text-sm text-muted font-sans">{title}</span>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold font-display text-text mb-2">
        {value}
      </div>

      {/* Trend */}
      {change !== undefined && activeTrend && (
        <div className="flex items-center gap-1.5 text-sm font-medium">
          {activeTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
          {activeTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
          {activeTrend === 'neutral' && <Minus className="w-4 h-4 text-muted" />}

          <span className={cn(
            activeTrend === 'up' && 'text-green-600',
            activeTrend === 'down' && 'text-red-500',
            activeTrend === 'neutral' && 'text-muted'
          )}>
            {activeTrend === 'up' && '↑'}{activeTrend === 'down' && '↓'} {Math.abs(change)}%
          </span>
          <span className="text-xs text-muted font-normal ml-1">from last week</span>
        </div>
      )}
    </div>
  )
}
