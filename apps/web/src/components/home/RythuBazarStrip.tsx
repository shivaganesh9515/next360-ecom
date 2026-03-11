'use client'

import { useModeStore } from '@/lib/store/modeStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react'

export function RythuBazarStrip() {
  const { activeMode } = useModeStore()

  if (activeMode !== 'RYTHU_BAZAR') return null

  const batches = [
    { id: 1, name: 'Sanga Reddy Mandal', farmer: 'Narayana Rao', items: 'Tomatoes, Greens', time: 'Picked 2h ago' },
    { id: 2, name: 'Vikarabad Harvest', farmer: 'Sita Devi', items: 'Carrots, Beetroot', time: 'Picked 3h ago' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 my-16">
       <div className="flex items-center justify-between mb-8">
          <div>
             <h2 className="text-4xl font-display font-black text-[#C0392B]">Live Rythu Mandi</h2>
             <p className="text-muted mt-2">Connecting you directly to Mandal-level harvest batches happening right now.</p>
          </div>
          <Button variant="outline" className="border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B]">View All Mandis</Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {batches.map((batch) => (
             <Card key={batch.id} className="border-l-8 border-l-[#C0392B] bg-white p-8">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#C0392B] mb-2">
                        <MapPin className="w-3 h-3" /> {batch.name}
                      </span>
                      <h3 className="text-2xl font-display font-bold">{batch.items}</h3>
                   </div>
                   <div className="text-right">
                      <span className="text-xs font-bold text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {batch.time}
                      </span>
                   </div>
                </div>
                
                <div className="bg-cream rounded-2xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C0392B]/10 flex items-center justify-center text-[#C0392B]">
                        👨‍🌾
                      </div>
                      <div>
                        <p className="text-xs text-muted">Lead Farmer</p>
                        <p className="text-sm font-bold">{batch.farmer}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-1 text-accent">
                      <Star className="w-4 h-4 fill-accent" />
                      <span className="text-xs font-bold text-text">4.9</span>
                   </div>
                </div>

                <Button className="w-full mt-6 bg-[#C0392B] hover:bg-[#C0392B]/90 h-12 rounded-xl">
                   Join Batch Purchase <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
             </Card>
          ))}
       </div>
    </section>
  )
}
