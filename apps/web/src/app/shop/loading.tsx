import React from 'react'
import { Skeleton } from '@next360/ui'

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Page Header Skeleton */}
      <div className="bg-cream/40 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center">
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-12 w-96 rounded-2xl" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <Skeleton className="h-[600px] w-full rounded-3xl" />
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 space-y-6">
            <Skeleton className="h-20 w-full rounded-3xl" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-3xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
