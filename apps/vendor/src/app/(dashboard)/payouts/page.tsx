'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@next360/ui'
import { DataTable } from '@next360/ui/DataTable'
import { IndianRupee, ArrowUpRight, Clock, CheckCircle, Loader2 } from 'lucide-react'
import PayoutRequestModal from '../../../components/payouts/PayoutRequestModal'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../services/vendorService'

export default function VendorPayoutsPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['vendor-payouts'],
    queryFn: () => vendorService.getPayouts()
  })

  const payoutData = data?.data || {
    balance: 0,
    pending: 0,
    withdrawn: 0,
    payouts: []
  }

  const columns: any[] = [
    { 
      accessorKey: 'id', 
      header: 'Transfer ID',
      cell: ({ row }: any) => <span className="font-mono text-sm">#{row.id.slice(-6)}</span>
    },
    { 
      accessorKey: 'createdAt', 
      header: 'Date',
      cell: ({ row }: any) => format(new Date(row.createdAt), 'MMM dd, yyyy')
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }: any) => <span className="font-bold">₹{(row.amount / 100).toLocaleString('en-IN')}</span>
    },
    { accessorKey: 'reference', header: 'Reference' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        return row.status === 'COMPLETED' 
          ? <Badge className="bg-green-100 text-green-800">Completed</Badge>
          : <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
      }
    }
  ]

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payouts & Earnings</h1>
          <p className="text-gray-500 text-sm">Manage your finances and track bank transfers.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="bg-green-600 hover:bg-green-700">
          Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-600 text-white shadow-md">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 font-medium">Available Balance</p>
                <h3 className="text-4xl font-bold mt-2">₹{(payoutData.balance / 100).toLocaleString('en-IN')}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
            <Button onClick={() => setModalOpen(true)} variant="outline" className="w-full mt-6 bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
              Withdraw Funds <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 font-medium text-sm">Pending Transfers</p>
                <h3 className="text-2xl font-bold text-gray-900">₹{(payoutData.pending / 100).toLocaleString('en-IN')}</h3>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 font-medium text-sm">Total Withdrawn</p>
                <h3 className="text-2xl font-bold text-gray-900">₹{(payoutData.withdrawn / 100).toLocaleString('en-IN')}</h3>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Transfer History</h2>
        </div>
        <div className="p-6">
          <DataTable columns={columns} data={payoutData.payouts || []} searchKey="id" />
        </div>
      </Card>

      <PayoutRequestModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        availableBalance={payoutData.balance} 
      />
    </div>
  )
}
