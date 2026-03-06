import React from 'react'

export default function CartLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-cream/40 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-32 h-4 bg-slate-200 rounded animate-pulse mb-4" />
          <div className="w-64 h-16 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 space-y-8 shadow-sm">
               <div className="h-12 w-48 bg-slate-100 rounded-xl animate-pulse" />
               <div className="space-y-12">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-8 items-center">
                       <div className="w-24 h-24 bg-slate-100 rounded-3xl animate-pulse" />
                       <div className="flex-1 space-y-3">
                          <div className="w-48 h-6 bg-slate-100 rounded animate-pulse" />
                          <div className="w-24 h-4 bg-slate-100 rounded animate-pulse" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
          <div className="lg:col-span-1">
             <div className="bg-white rounded-[2.5rem] p-8 h-96 shadow-sm border border-slate-100 animate-pulse">
                <div className="h-8 w-48 bg-slate-100 rounded-xl mb-8" />
                <div className="space-y-4">
                   <div className="h-4 bg-slate-50 rounded" />
                   <div className="h-4 bg-slate-50 rounded" />
                   <div className="h-4 bg-slate-50 rounded" />
                   <div className="h-12 bg-slate-100 rounded-2xl md:mt-12" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  )
}
