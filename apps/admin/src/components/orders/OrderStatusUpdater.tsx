'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { toast } from 'sonner'
import { ChevronDown, Loader2 } from 'lucide-react'

const STATUS_OPTIONS = [
  'PENDING',
  'CONFIRMED', 
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED'
]

interface OrderStatusUpdaterProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newStatus: string) => adminService.updateOrderStatus(orderId, { status: newStatus }),
    onSuccess: () => {
      toast.success('Order status updated')
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin-order', orderId] })
      setIsOpen(false)
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update order status')
    }
  })

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={mutation.isPending}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
      >
        Update Status
        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-10 py-1">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              disabled={status === currentStatus}
              onClick={() => mutation.mutate(status)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                status === currentStatus 
                  ? 'bg-primary/5 text-primary cursor-default' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
