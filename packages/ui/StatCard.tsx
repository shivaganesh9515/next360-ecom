import React from 'react'
import { cn } from '@next360/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card } from './Card'

export interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
  className,
}) => {
  // Auto-determine trend if not provided and change is present
  const activeTrend = trend || (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined)

  return (
    <Card padding="md" hover={false} className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted">{title}</h3>
        {icon && <div className="text-secondary p-2 bg-secondary/10 rounded-full">{icon}</div>}
      </div>
      
      <div>
        <div className="text-2xl font-bold text-text">{value}</div>
        
        {change !== undefined && activeTrend && (
          <div className="flex items-center gap-1 mt-1 text-sm font-medium">
            {activeTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
            {activeTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
            {activeTrend === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
            
            <span className={cn(
              activeTrend === 'up' && 'text-green-600',
              activeTrend === 'down' && 'text-red-600',
              activeTrend === 'neutral' && 'text-gray-500'
            )}>
              {change > 0 && '+'}{change}%
            </span>
            <span className="text-muted text-xs font-normal ml-1">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  )
}
