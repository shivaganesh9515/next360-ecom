import React from 'react'

export default function CheckoutLoading() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-cream/40 py-8">
        <div className="max-w-7xl mx-auto px-4">
           <div className="w-32 h-4 bg-slate-200 rounded animate-pulse mb-3" />
           <div className="w-48 h-10 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-12">
           <div className="w-full max-w-xl h-16 bg-slate-100 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
             <div className="bg-white rounded-[2.5rem] p-8 h-96 shadow-sm border border-slate-100 animate-pulse" />
          </div>
          <div className="lg:col-span-1">
             <div className="bg-white rounded-[2.5rem] p-8 h-80 shadow-sm border border-slate-100 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
