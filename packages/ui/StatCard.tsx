import React from 'react'
import { Card } from './Card'
import { cn } from '@next360/utils'

export interface StatCardProps {
  label: string
  value: string | number
  trend?: string
  icon: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'green' | 'indigo' | 'orange' | 'blue'
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  trend, 
  icon: Icon, 
  variant = 'secondary',
  className
}) => {
  const borderColors: Record<string, string> = {
    primary: 'border-l-4 border-primary',
    secondary: 'border-l-4 border-secondary',
    accent: 'border-l-4 border-accent',
    green: 'border-l-4 border-green-600',
    indigo: 'border-l-4 border-indigo-600',
    orange: 'border-l-4 border-orange-500',
    blue: 'border-l-4 border-blue-500',
  }

  return (
    <Card padding="p-6" className={cn(borderColors[variant], className)}>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
          {Icon}
        </div>
        <span className="text-sm font-sans text-muted">{label}</span>
      </div>
      <div className="mt-4">
        <h4 className="text-3xl font-bold font-display text-text">{value}</h4>
        {trend && (
          <div className={cn(
            "text-sm mt-1 font-sans font-medium",
            trend.startsWith('↑') || trend.includes('+') ? "text-green-600" : "text-red-500"
          )}>
            {trend}
          </div>
        )}
      </div>
    </Card>
  )
}
