'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/adminService'
import { Button } from '@next360/ui/Button'
import { Input } from '@next360/ui/Input'
import { toast } from 'sonner'
import { Landmark } from 'lucide-react'

interface PayoutManagerProps {
  vendorId: string
  pendingBalance: number
}

export function PayoutManager({ vendorId, pendingBalance }: PayoutManagerProps) {
  const [amount, setAmount] = useState<string>('')
  const [transactionId, setTransactionId] = useState<string>('')
  const queryClient = useQueryClient()

  const payoutMutation = useMutation({
    mutationFn: () => adminService.processPayout(vendorId, transactionId),
    onSuccess: () => {
      toast.success('Payout recorded successfully')
      setAmount('')
      setTransactionId('')
      queryClient.invalidateQueries({ queryKey: ['admin-vendor', vendorId] })
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to process payout')
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text flex items-center gap-2">
          <Landmark className="w-5 h-5 text-muted" />
          Process Payout
        </h3>
        <div className="text-right">
          <p className="text-xs text-muted uppercase tracking-wider font-semibold">Pending Balance</p>
          <p className="text-xl font-bold text-text">₹{pendingBalance.toLocaleString()}</p>
        </div>
      </div>

      <form 
        onSubmit={(e) => {
          e.preventDefault()
          if (!transactionId) return toast.error('Transaction ID is required')
          payoutMutation.mutate()
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-text mb-1">Payout Amount (₹)</label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Amount to pay"
            // For real system, compare securely or prefill full amount
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1">Bank Reference / Transaction ID</label>
          <Input 
            value={transactionId} 
            onChange={(e) => setTransactionId(e.target.value)} 
            placeholder="e.g. UTR123456789"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={!amount || !transactionId || payoutMutation.isPending}
          isLoading={payoutMutation.isPending}
        >
          Record Payout
        </Button>
      </form>
    </div>
  )
}
