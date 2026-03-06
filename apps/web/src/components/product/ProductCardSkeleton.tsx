import React from 'react'

export default function ProductCardSkeleton() {
  return (
    <div className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square rounded-[2rem] bg-slate-100 mb-6" />
      
      {/* Content Skeleton */}
      <div className="px-2 space-y-3">
        <div className="h-4 bg-slate-100 rounded-full w-20" />
        <div className="h-6 bg-slate-100 rounded-full w-full" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-slate-100 rounded-full w-16" />
          <div className="h-10 bg-slate-100 rounded-full w-10" />
        </div>
      </div>
    </div>
  )
}
