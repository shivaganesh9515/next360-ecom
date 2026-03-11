'use client'

import { useParams } from 'next/navigation'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { Star, MapPin, Calendar, ShieldCheck, Users, Mail, Phone, ExternalLink } from 'lucide-react'
import { useSelector } from 'react-redux'
import Footer from '@/components/Footer'

export default function SellerProfile() {
  const { slug } = useParams()
  const products = useSelector(state => state.product.list)

  // Mock Seller Data (In real app, fetch by slug)
  const seller = {
    name: "Sri Lakshmi Bio-Farms",
    slug: "sri-lakshmi-bio-farms",
    avatar: "https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=200",
    cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600",
    rating: 4.9,
    reviews: 124,
    location: "Sanga Reddy, Telangana",
    joined: "March 2022",
    description: "Sri Lakshmi Bio-Farms is a collective of 45 small-scale farmers dedicated to reviving ancient cropping patterns. We specialize in NPOP certified pulses and cold-pressed oils. Every batch you buy supports the local ZP school through our community fund.",
    certifications: ['NPOP', 'PGS', 'FSSAI'],
    stats: [
      { label: 'Active Batches', value: '12' },
      { label: 'Families Served', value: '1.2k' },
      { label: 'Acres Organic', value: '240' }
    ]
  }

  const sellerProducts = products.filter(p => p.vendorSlug === slug || true) // Mock filter

  return (
    <main className="min-h-screen bg-cream">
       <AnnouncementBar />
       <Navbar />

       {/* Hero Section */}
       <div className="relative h-[400px] w-full">
          <img src={seller.cover} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 inset-x-0">
             <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-10 flex flex-col md:flex-row items-end gap-6">
                <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white overflow-hidden shadow-2xl bg-white flex-shrink-0">
                   <img src={seller.avatar} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-white pb-2">
                   <div className="flex items-center gap-3 mb-2">
                      <Badge variant="organic" className="bg-white/20 backdrop-blur-md border-none text-white">Verified Vendor</Badge>
                      <div className="flex items-center gap-1">
                         <Star className="w-4 h-4 fill-accent text-accent" />
                         <span className="text-sm font-bold">{seller.rating} ({seller.reviews} Reviews)</span>
                      </div>
                   </div>
                   <h1 className="text-5xl font-display font-black tracking-tighter">{seller.name}</h1>
                   <div className="flex items-center gap-6 mt-4 text-white/80">
                      <span className="flex items-center gap-2 text-sm font-medium"><MapPin className="w-4 h-4" /> {seller.location}</span>
                      <span className="flex items-center gap-2 text-sm font-medium"><Calendar className="w-4 h-4" /> Partner since {seller.joined}</span>
                   </div>
                </div>
                <div className="flex gap-4 pb-2">
                   <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-primary">
                      <Mail className="w-4 h-4 mr-2" /> Message
                   </Button>
                   <Button className="rounded-2xl shadow-xl shadow-secondary/20">
                      Follow Store
                   </Button>
                </div>
             </div>
          </div>
       </div>

       {/* Content */}
       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
             {/* Profile Sidebar */}
             <div className="lg:col-span-4 space-y-10">
                <section>
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-4">The Story</h3>
                   <p className="text-muted leading-relaxed font-sans">{seller.description}</p>
                </section>

                <section>
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-4">Vendor Certifications</h3>
                   <div className="flex flex-wrap gap-3">
                      {seller.certifications.map(c => <CertificationBadge key={c} type={c} size="md" />)}
                   </div>
                </section>

                <Card className="p-8 border-dashed bg-white">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-6">Impact Statistics</h3>
                   <div className="space-y-6">
                      {seller.stats.map(stat => (
                         <div key={stat.label} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted">{stat.label}</span>
                            <span className="text-2xl font-display font-black text-text">{stat.value}</span>
                         </div>
                      ))}
                   </div>
                   <Button variant="ghost" className="w-full mt-8 text-secondary font-black uppercase text-[10px] tracking-widest">
                      View Impact Report <ExternalLink className="w-4 h-4 ml-2" />
                   </Button>
                </Card>

                <section className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-6">Community Updates</h3>
                   <div className="space-y-6">
                      <div className="border-l-2 border-secondary pl-4 py-1">
                         <p className="text-xs font-bold text-text">New Harvest Arriving</p>
                         <p className="text-[10px] text-muted">Aralu Paddy harvest starting this Monday. Pre-orders open now.</p>
                      </div>
                      <div className="border-l-2 border-border pl-4 py-1">
                         <p className="text-xs font-bold text-text">Bio-Fertilizer Workshop</p>
                         <p className="text-[10px] text-muted">Hosted 20 local youth for our monthly sustainability drill.</p>
                      </div>
                   </div>
                </section>
             </div>

             {/* Catalog */}
             <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                   <h2 className="text-3xl font-display font-black text-text">Store Catalog</h2>
                   <div className="flex items-center gap-4">
                      <Badge variant="organic" size="sm" className="bg-cream text-muted border-border">{sellerProducts.length} Products</Badge>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {sellerProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                   ))}
                </div>
             </div>
          </div>
       </div>

       <Footer />
    </main>
  )
}
