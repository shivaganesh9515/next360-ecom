import React from 'react'
import { Skeleton } from '@next360/ui'

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 mb-20">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square rounded-[2rem]" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-24 h-24 rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-3/4 rounded-2xl" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <Skeleton className="h-10 w-48 rounded-xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-20 rounded-xl" />
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-16 w-32 rounded-2xl" />
              <Skeleton className="h-16 flex-1 rounded-2xl" />
              <Skeleton className="h-16 w-16 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
