'use client'

import { GlassCard, Badge } from '@next360/ui'
import { mockVendorOrders } from '@next360/utils'

const lanes = ['PENDING', 'PROCESSING', 'DELIVERED']

export default function VendorOrdersPage() {
  return (
    <div className="space-y-6 pb-20">
      <div>
        <div className="text-[11px] uppercase tracking-[0.24em] text-primary/70">Premium operations</div>
        <h1 className="mt-2 font-display text-4xl font-semibold text-text">Order management</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted md:text-base">
          Kanban lanes for fulfillment state, plus proximity context so local dispatch decisions are obvious.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 lg:grid-cols-3">
          {lanes.map((lane) => (
            <GlassCard key={lane} className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-[0.18em] text-muted">{lane}</h2>
                <Badge variant="info" className="border-none bg-black/5 text-text">
                  {mockVendorOrders.filter((order) => order.status === lane).length}
                </Badge>
              </div>
              <div className="space-y-3">
                {mockVendorOrders
                  .filter((order) => order.status === lane)
                  .map((order) => (
                    <div key={order.id} className="rounded-[22px] border border-black/5 bg-white/60 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-text">{order.customerName}</div>
                          <div className="text-xs uppercase tracking-[0.2em] text-muted">{order.id}</div>
                        </div>
                        <div className="text-right text-xs text-muted">
                          <div>{order.distanceKm} km</div>
                          <div>{order.cluster}</div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-muted">{order.totalItems} items</span>
                        <span className="font-semibold text-primary">Rs {(order.amount / 100).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-5">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted">Proximity board</div>
          <h2 className="mt-2 text-2xl font-semibold text-text">Dispatch by cluster</h2>
          <div className="mt-5 space-y-3">
            {[...mockVendorOrders]
              .sort((a, b) => a.distanceKm - b.distanceKm)
              .map((order) => (
                <div key={order.id} className="rounded-[24px] border border-black/5 bg-white/55 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-text">{order.cluster}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted">{order.customerName}</div>
                    </div>
                    <div className="text-xl font-semibold text-primary">{order.distanceKm} km</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-black/5">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(20, 100 - order.distanceKm * 6)}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
