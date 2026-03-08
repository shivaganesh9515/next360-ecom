"use client"

import React from 'react'
import { Leaf } from 'lucide-react'
import { MOCK_SEEDS_TRANSACTIONS, MOCK_USER } from '@/lib/mockAccount'
import SeedsProgress from '@/components/account/SeedsProgress'
import { SEEDS_ACTIONS } from '@next360/utils'

export default function SeedsPage() {
  return (
    <div className="space-y-6">
      {/* SECTION 1 - Balance + Level */}
      <SeedsProgress seeds={MOCK_USER.seeds} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* SECTION 2 - How to Earn */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-text mb-6 flex items-center gap-2">
            <Leaf size={20} className="text-secondary" />
            How to Earn Seeds
          </h2>

          <div className="border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-border">
                {Object.entries(SEEDS_ACTIONS).map(([key, value], idx) => {
                  const label = key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
                  return (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-cream/50' : 'bg-white'}>
                      <td className="py-3 px-4 text-text font-medium">{label}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs font-black rounded-md">
                          +{value} 🌱
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3 - Transaction History */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-cream/50">
            <h2 className="font-display text-xl font-bold text-text">Transaction History</h2>
          </div>

          <div className="divide-y divide-border">
            {MOCK_SEEDS_TRANSACTIONS.map((tx) => {
              const dateObj = new Date(tx.date)
              const formattedDate = dateObj.toLocaleDateString('en-IN', {
                month: 'short', day: 'numeric', year: 'numeric'
              })

              return (
                <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-cream/50 transition-colors">
                  <div>
                    <p className="font-bold text-text text-sm">{tx.action}</p>
                    <p className="text-xs text-muted font-medium mt-0.5">{formattedDate}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black mb-0.5 ${tx.amount > 0 ? 'text-secondary' : 'text-red-500'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} 🌱
                    </p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                      Balance: {tx.balance.toLocaleString()}
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
