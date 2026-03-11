'use client'

import { useLocationStore } from '@/lib/store/locationStore'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MapPin, Plus, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export function AddressSelector({ onSelect }) {
  const { city, pincode, state } = useLocationStore()
  const [selectedId, setSelectedId] = useState(1)

  const addresses = [
    { id: 1, type: 'Home', default: true, name: 'John Doe', line: 'Plot 42, Road 12, Banjara Hills', city, pincode, state },
    { id: 2, type: 'Office', default: false, name: 'John Doe', line: 'Mindspace IT Park, Hitech City', city: 'Hyderabad', pincode: '500081', state: 'Telangana' },
  ]

  return (
    <div className="space-y-6 font-sans">
       <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-black text-text">Delivery Address</h3>
          <button className="text-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-1">
             <Plus className="w-3 h-3" /> Add New Address
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
             <Card 
               key={addr.id} 
               onClick={() => setSelectedId(addr.id)}
               className={cn(
                 "p-6 cursor-pointer border-2 transition-all",
                 selectedId === addr.id ? "border-secondary bg-green-50/30" : "border-border hover:border-primary/20 bg-white"
               )}
             >
                <div className="flex justify-between items-start mb-4">
                   <Badge variant={addr.type === 'Home' ? 'organic' : 'fresh'} size="sm">{addr.type}</Badge>
                   {selectedId === addr.id && <CheckCircle2 className="w-5 h-5 text-secondary" />}
                </div>
                <p className="font-bold text-text mb-1">{addr.name}</p>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{addr.line}, {addr.city}, {addr.state} - {addr.pincode}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-secondary uppercase">
                   <MapPin className="w-3 h-3" /> Area Serviced by Hub: {addr.pincode.startsWith('500') ? 'HYD-CENTRAL' : 'HYD-OUTSKIRTS'}
                </div>
             </Card>
          ))}
       </div>
    </div>
  )
}
