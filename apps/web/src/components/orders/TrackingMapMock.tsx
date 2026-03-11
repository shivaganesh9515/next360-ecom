'use client'

import { MapPin, Navigation, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export function TrackingMapMock() {
  return (
    <div className="relative w-full h-[500px] bg-[#E8EAE6] rounded-[3rem] overflow-hidden border border-border">
       {/* Stylized Map Grid Overlay */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
         backgroundImage: 'radial-gradient(#2D5016 1px, transparent 1px)', 
         backgroundSize: '20px 20px' 
       }} />

       {/* Destination Marker */}
       <div className="absolute top-1/4 right-1/4">
          <div className="relative">
             <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
             <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl relative z-10 border-2 border-white">
                <MapPin className="w-5 h-5" />
             </div>
             <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-border whitespace-nowrap">
                <p className="text-[10px] font-black uppercase text-text tracking-widest">Home</p>
             </div>
          </div>
       </div>

       {/* Delivery Vehicle Marker */}
       <div className="absolute bottom-1/3 left-1/3">
          <div className="relative transition-all duration-[2000ms]">
             <div className="w-8 h-8 bg-secondary rounded-xl flex items-center justify-center text-white shadow-xl border-2 border-white">
                <Navigation className="w-5 h-5 rotate-[135deg]" />
             </div>
             <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-primary px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                <p className="text-[10px] font-black uppercase text-white tracking-widest">Courier: 2.1km</p>
             </div>
          </div>
       </div>

       {/* Map HUD */}
       <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-border shadow-lg max-w-[200px]">
             <p className="text-[10px] font-black uppercase text-muted tracking-widest mb-1">Zone Hub</p>
             <p className="text-xs font-bold text-text">Banjara Hills Cluster 04</p>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-border shadow-lg flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
             <p className="text-[10px] font-black uppercase text-secondary tracking-widest">Agent Live</p>
          </div>
       </div>
       
       <div className="absolute bottom-6 inset-x-6">
          <Card className="bg-white/95 backdrop-blur-md p-6 border-none shadow-2xl rounded-[2.5rem] flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-cream">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-[10px] font-black tracking-widest text-muted uppercase">On the Way</p>
                   <p className="text-sm font-bold text-text">Ramesh Kumar <span className="text-muted mx-1">•</span> ⭐ 4.9</p>
                </div>
             </div>
             <button className="bg-primary text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all">
                Call Agent
             </button>
          </Card>
       </div>
    </div>
  )
}
