"use client"

import React from 'react'
import { Leaf } from 'lucide-react'
import { MOCK_SEEDS_TRANSACTIONS, MOCK_USER } from '@/lib/mockAccount'
import SeedsProgress from '@/components/account/SeedsProgress'
import { SEEDS_ACTIONS } from '@next360/utils'
import { Badge } from '@next360/ui'

export default function SeedsPage() {
  return (
    <div className="space-y-12">
      {/* SECTION 1 - Balance + Level */}
      <SeedsProgress seeds={MOCK_USER.seeds} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* SECTION 2 - How to Earn */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/30">
          <div className="mb-10">
             <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
                <span className="w-8 h-[2.5px] bg-primary" /> Growth Logic
             </div>
             <h2 className="text-2xl font-black text-slate-900 tracking-tight italic leading-none flex items-center gap-4">
               Seed Accrual Protocol
             </h2>
          </div>

          <div className="border border-slate-50 rounded-[2rem] overflow-hidden shadow-inner">
            <table className="w-full text-left text-[11px]">
              <tbody className="divide-y divide-slate-50">
                {Object.entries(SEEDS_ACTIONS).map(([key, value], idx) => {
                  const label = key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
                  return (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="py-5 px-6 text-slate-900 font-black italic tracking-tight">{label}</td>
                      <td className="py-5 px-6 text-right">
                        <Badge className="bg-primary/10 text-primary text-[10px] font-black rounded-full border-none shadow-lg px-4 py-1.5">
                          +{value} 🌱
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3 - Transaction History */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/30">
          <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight italic leading-none">Transmission Log</h2>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-inner">
               <span className="text-[10px] font-black text-primary opacity-40 italic">TX</span>
            </div>
          </div>

          <div className="divide-y divide-slate-50">
            {MOCK_SEEDS_TRANSACTIONS.map((tx) => {
              const dateObj = new Date(tx.date)
              const formattedDate = dateObj.toLocaleDateString('en-IN', {
                month: 'short', day: 'numeric', year: 'numeric'
              })

              return (
                <div key={tx.id} className="p-6 md:p-8 flex justify-between items-center hover:bg-slate-50/50 transition-all duration-500 group">
                  <div className="flex items-center gap-5">
                    <div className={`w-3 h-3 rounded-full ${tx.amount > 0 ? 'bg-primary' : 'bg-red-500'} shadow-lg`} />
                    <div>
                      <p className="font-black text-slate-900 text-sm tracking-tight italic leading-none mb-2">{tx.action}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-black mb-1 italic ${tx.amount > 0 ? 'text-primary' : 'text-red-500'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} 🌱
                    </p>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                      Node Balance: <span className="text-slate-900">{tx.balance.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
