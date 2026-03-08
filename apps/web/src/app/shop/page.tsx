import React, { Suspense } from 'react'
import ShopClient from './ShopClient'

export const revalidate = 3600 // revalidate every hour

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div></div>}>
      <ShopClient />
    </Suspense>
  )
}
