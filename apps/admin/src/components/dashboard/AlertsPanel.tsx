'use client'

import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface AlertsPanelProps {
  alerts: Array<{
    id: string
    type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'
    message: string
    createdAt: string
  }>
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'ERROR': return <XCircle className="w-5 h-5 text-red-500" />
      case 'SUCCESS': return <CheckCircle className="w-5 h-5 text-green-500" />
      default: return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBg = (type: string) => {
    switch (type) {
      case 'WARNING': return 'bg-yellow-50 border-yellow-100'
      case 'ERROR': return 'bg-red-50 border-red-100'
      case 'SUCCESS': return 'bg-green-50 border-green-100'
      default: return 'bg-blue-50 border-blue-100'
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border h-[400px] flex flex-col">
      <h3 className="text-lg font-semibold text-text mb-6 shrink-0">System Alerts</h3>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {alerts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted text-sm">
            No active alerts at this time.
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-xl border flex items-start gap-3 ${getBg(alert.type)}`}
            >
              <div className="shrink-0 mt-0.5">{getIcon(alert.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text leading-snug mb-1">
                  {alert.message}
                </p>
                <p className="text-xs text-muted">
                  {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
