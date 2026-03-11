'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button, GlassCard, Badge } from '@next360/ui'
import { mockProducts } from '@next360/utils'
import { Plus } from 'lucide-react'

export default function VendorProductsPage() {
  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-primary/70">Visual inventory studio</div>
          <h1 className="mt-2 font-display text-4xl font-semibold text-text">Product management</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted md:text-base">
            A premium overview of stock health, delivery coverage, and product readiness for the storefront.
          </p>
        </div>
        <Link href="/products/new">
          <Button className="rounded-full px-6 py-5 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Add product
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {mockProducts.map((product) => (
          <GlassCard key={product.id} className="overflow-hidden">
            <div className="relative h-52">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted">{product.category?.name}</div>
                  <h2 className="mt-2 text-2xl font-semibold text-text">{product.name}</h2>
                </div>
                <Badge variant="info" className="border-none bg-black/5 text-text">
                  {product.deliveryType}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-muted">{product.shortDesc}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-black/5 bg-white/50 p-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Stock</div>
                  <div className="mt-2 text-xl font-semibold text-primary">{product.stock}</div>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/50 p-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Orders</div>
                  <div className="mt-2 text-xl font-semibold text-primary">{product.orderCount}</div>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/50 p-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Rating</div>
                  <div className="mt-2 text-xl font-semibold text-primary">{product.rating}</div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
