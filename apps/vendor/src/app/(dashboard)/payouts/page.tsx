'use client'

import { useState } from 'react'
import { Card, Button, Badge } from '@next360/ui'
import { DataTable } from '@next360/ui/DataTable'
import { IndianRupee, ArrowUpRight, Clock, CheckCircle, Loader2 } from 'lucide-react'
import PayoutRequestModal from '../../../components/payouts/PayoutRequestModal'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { vendorService } from '../../../services/vendorService'

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

  const displayColumns: any[] = [
    { 
      accessorKey: 'id', 
      header: 'Transfer Seq',
      cell: ({ row }: any) => <span className="font-black text-[10px] tracking-tighter italic text-slate-400 uppercase">SEQ-{row.original.id.slice(-8)}</span>
    },
    { 
      accessorKey: 'createdAt', 
      header: 'Finalization Date',
      cell: ({ row }: any) => <span className="font-bold text-slate-500">{format(new Date(row.original.createdAt), 'dd / MM / yyyy')}</span>
    },
    {
      accessorKey: 'amount',
      header: 'Settlement Amount',
      cell: ({ row }: any) => <span className="font-black text-slate-900 tracking-tighter italic text-lg">₹{(row.original.amount / 100).toLocaleString('en-IN')}</span>
    },
    { accessorKey: 'reference', header: 'Registry Ref' },
    {
      accessorKey: 'status',
      header: 'Final State',
      cell: ({ row }: any) => {
        return row.original.status === 'COMPLETED' 
          ? <Badge className="rounded-full px-5 py-1.5 border-none bg-primary text-white font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20">Finalized</Badge>
          : <Badge className="rounded-full px-5 py-1.5 border-none bg-amber-100 text-amber-700 font-black text-[9px] uppercase tracking-widest shadow-sm">In Sequence</Badge>
      }
    }
  ]

  if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-12 pb-24 font-sans max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 px-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
             <div className="h-1.5 w-12 bg-primary rounded-full shadow-sm" />
             <div className="text-[10px] uppercase tracking-[0.5em] font-black text-primary/60 italic">Treasury Protocol</div>
          </div>
          <h1 className="font-display text-7xl font-black text-slate-900 tracking-tighter italic leading-none">Yield & Assets</h1>
          <p className="mt-8 text-lg font-bold text-slate-500 leading-relaxed opacity-80 decoration-primary/20 underline underline-offset-8">Managing high-fidelity financial settlements and bank transfer sequences across the network.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="rounded-[2rem] px-12 py-10 font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all text-white bg-primary border-none group relative overflow-hidden shrink-0">
           <span className="relative z-10 flex items-center gap-4">
              <ArrowUpRight className="h-6 w-6" strokeWidth={3} />
              Request Settlement
           </span>
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-primary p-12 rounded-[3.5rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden group col-span-1 lg:col-span-1 min-h-[380px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-8 italic">Available Yield</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black opacity-40 italic mt-auto">₹</span>
              <h3 className="text-7xl font-black tracking-tighter italic leading-none">{(payoutData.balance / 100).toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className="relative z-10 pt-10">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-sm">
                 <IndianRupee className="w-6 h-6 text-white" strokeWidth={3} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Authorized Liquidity</p>
            </div>
            <Button onClick={() => setModalOpen(true)} variant="outline" className="w-full py-8 rounded-[1.5rem] bg-white/10 border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-xl group/btn overflow-hidden border-none text-center block">
              <span className="flex items-center justify-center gap-3">Instant Transfer <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></span>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-[1.5rem] bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-8 h-8 text-amber-500" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Pending Sequences</p>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">₹{(payoutData.pending / 100).toLocaleString('en-IN')}</h3>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 italic opacity-60 ml-2">Verification in progress for 3 active nodes.</p>
          </div>

          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden group flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <CheckCircle className="w-8 h-8 text-emerald-500" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Total Extraction</p>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">₹{(payoutData.withdrawn / 100).toLocaleString('en-IN')}</h3>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 italic opacity-60 ml-2">Successfully finalized network settlements.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-2 rounded-[3.5rem] border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.04)] overflow-hidden relative group">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-3">
              <div className="h-1 w-6 bg-slate-200 rounded-full" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Transfer Log Matrix</h2>
           </div>
           <div className="h-10 px-5 rounded-full bg-slate-100/50 border border-slate-200/50 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Verification</p>
           </div>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          <DataTable columns={displayColumns} data={payoutData.payouts || []} />
        </div>
      </div>

      <PayoutRequestModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        availableBalance={payoutData.balance} 
      />
    </div>
    </div>
  )
}
