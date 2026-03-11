'use client'

import { useCompareStore } from '@/lib/store/compareStore'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { Star, ShieldCheck, MapPin, X, ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function ComparePage() {
  const { compareList, removeFromCompare } = useCompareStore()

  const attributes = [
    { label: 'Origin District', key: 'origin' },
    { label: 'Certification', key: 'certification' },
    { label: 'Purity Level', key: 'purity' },
    { label: 'Harvest Age', key: 'harvest' },
    { label: 'Price per Unit', key: 'price' },
    { label: 'Avg Rating', key: 'rating' },
  ]

  if (compareList.length === 0) {
    return (
      <main className="min-h-screen bg-cream flex flex-col">
         <AnnouncementBar />
         <Navbar />
         <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <span className="text-6xl mb-6">🤝</span>
            <h1 className="text-4xl font-display font-black text-text">Nothing to compare yet</h1>
            <p className="text-muted mt-2 max-w-sm">Select at least 2 products from the marketplace to see a side-by-side analysis.</p>
            <Button className="mt-8 px-10 h-14 rounded-2xl" onClick={() => window.location.href = '/shop'}>
               Go to Marketplace
            </Button>
         </div>
         <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
       <AnnouncementBar />
       <Navbar />

       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 pb-32">
          <div className="flex items-center justify-between mb-16">
             <div className="space-y-2">
                <Link href="/shop" className="text-[10px] font-black uppercase text-muted flex items-center gap-1 hover:text-primary transition-colors">
                   <ArrowLeft className="w-3 h-3" /> Back to Shop
                </Link>
                <h1 className="text-5xl font-display font-black text-text tracking-tighter">Produce Analysis</h1>
             </div>
             <div className="bg-white/50 border border-border px-6 py-3 rounded-2xl flex items-center gap-4">
                <Info className="w-5 h-5 text-secondary" />
                <p className="text-xs font-medium text-muted">Comparison based on <span className="text-text font-bold">certified batch logs</span> provided by vendors.</p>
             </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-border shadow-xl overflow-hidden">
             <table className="w-full table-fixed border-collapse">
                <thead>
                   <tr>
                      <th className="w-1/4 p-10 text-left border-r border-border bg-cream/30">
                         <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Attribute Matrix</span>
                            <h3 className="text-xl font-display font-bold text-text leading-tight">Batch Comparison Protocol</h3>
                         </div>
                      </th>
                      {compareList.map((item) => (
                         <th key={item.id} className="p-10 border-r last:border-r-0 border-border">
                            <div className="space-y-6 relative group">
                               <button 
                                 onClick={() => removeFromCompare(item.id)}
                                 className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                               >
                                 <X className="w-5 h-5" />
                               </button>
                               <div className="aspect-square bg-cream rounded-2xl overflow-hidden border border-border shadow-sm">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                               </div>
                               <div className="text-left space-y-2">
                                  <Badge variant="organic" size="sm" className="scale-90 origin-left">{item.category}</Badge>
                                  <h4 className="text-lg font-display font-bold text-text line-clamp-2">{item.name}</h4>
                               </div>
                            </div>
                         </th>
                      ))}
                      {/* Fill empty slots */}
                      {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                        <th key={`empty-${i}`} className="border-r last:border-r-0 border-border opacity-20">
                           <div className="p-10 text-center">
                              <div className="aspect-square border-2 border-dashed border-muted rounded-2xl mb-6 flex items-center justify-center">
                                 <span className="text-3xl font-black">+</span>
                              </div>
                              <span className="text-[10px] font-black uppercase text-muted">Slot {compareList.length + i + 1}</span>
                           </div>
                        </th>
                      ))}
                   </tr>
                </thead>
                <tbody>
                   {attributes.map((attr, idx) => (
                      <tr key={attr.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-cream/20'}>
                         <td className="p-10 border-r border-t border-border align-middle">
                            <span className="text-xs font-black uppercase tracking-widest text-muted">{attr.label}</span>
                         </td>
                         {compareList.map((item) => (
                            <td key={`${item.id}-${attr.key}`} className="p-10 border-r border-t last:border-r-0 border-border">
                               {attr.key === 'certification' ? (
                                  <CertificationBadge type={item.certification || 'NPOP'} size="md" />
                               ) : attr.key === 'price' ? (
                                  <span className="text-2xl font-black text-primary">₹{item.price}</span>
                               ) : attr.key === 'rating' ? (
                                  <div className="flex items-center gap-1">
                                     <Star className="w-4 h-4 fill-accent text-accent" />
                                     <span className="text-sm font-bold font-sans">4.8</span>
                                  </div>
                               ) : (
                                  <span className={`text-sm font-bold ${attr.key === 'harvest' ? 'text-secondary' : 'text-text'}`}>
                                     {item[attr.key] || 'Premium Value'}
                                  </span>
                               )}
                            </td>
                         ))}
                         {/* Empty data slots */}
                         {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                            <td key={`empty-td-${i}`} className="border-r border-t last:border-r-0 border-border opacity-20" />
                         ))}
                      </tr>
                   ))}
                   <tr>
                      <td className="p-10 border-r border-t border-border" />
                      {compareList.map((item) => (
                         <td key={`${item.id}-action`} className="p-10 border-r border-t last:border-r-0 border-border">
                            <Button className="w-full h-14 rounded-2xl shadow-xl shadow-secondary/20">Add to Basket</Button>
                         </td>
                      ))}
                      {/* Empty action slots */}
                      {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                         <td key={`empty-action-${i}`} className="border-r border-t last:border-r-0 border-border opacity-20" />
                      ))}
                   </tr>
                </tbody>
             </table>
          </div>
       </div>

       <Footer />
    </main>
  )
}
