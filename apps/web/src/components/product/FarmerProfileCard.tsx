import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Star, ShieldCheck, MapPin } from 'lucide-react'

export function FarmerProfileCard({ farmer }) {
  const defaultFarmer = {
    name: 'Narayana Rao',
    location: 'Sanga Reddy, Telangana',
    rating: 4.9,
    experience: '12 Years Organic',
    specialty: 'Ancient Grains & Pulses',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=200'
  }

  const f = farmer || defaultFarmer

  return (
    <Card className="bg-cream border-border p-6 rounded-[2rem]">
       <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
             <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
          </div>
          <div>
             <h4 className="text-lg font-display font-bold text-text">{f.name}</h4>
             <p className="text-xs text-muted flex items-center gap-1 font-sans">
                <MapPin className="w-3 h-3" /> {f.location}
             </p>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-3 text-center">
             <p className="text-[10px] uppercase font-black tracking-widest text-muted">Rating</p>
             <p className="text-sm font-bold flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-accent text-accent" /> {f.rating}
             </p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
             <p className="text-[10px] uppercase font-black tracking-widest text-muted">Experience</p>
             <p className="text-sm font-bold">{f.experience}</p>
          </div>
       </div>

       <div className="space-y-4 pt-4 border-t border-border/50">
          <div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted block mb-1">Mandal Specialty</span>
             <p className="text-xs font-bold text-text">{f.specialty}</p>
          </div>
          <div className="flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-secondary" />
             <span className="text-[10px] font-black uppercase text-secondary">Verified Next360 Partner</span>
          </div>
       </div>
    </Card>
  )
}
