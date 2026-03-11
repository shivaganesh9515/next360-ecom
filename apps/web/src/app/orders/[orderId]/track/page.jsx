'use client'

import { useParams } from 'next/navigation'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Navbar } from '@/components/layout/Navbar'
import { TrackingTimeline } from '@/components/orders/TrackingTimeline'
import { TrackingMapMock } from '@/components/orders/TrackingMapMock'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Share2, FileText, Smartphone } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function OrderTracking() {
  const { orderId } = useParams()

  return (
    <main className="min-h-screen bg-cream">

       <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 pb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
             <div className="space-y-4">
                <Link href="/orders" className="text-[10px] font-black uppercase text-muted flex items-center gap-1 hover:text-primary transition-colors">
                   <ArrowLeft className="w-3 h-3" /> Back to My Orders
                </Link>
                <div className="flex items-center gap-3">
                   <h1 className="text-5xl font-display font-black text-text tracking-tighter">Order #N360-{orderId?.slice(-6).toUpperCase() || 'HB82ZA'}</h1>
                   <Badge variant="organic" size="md">IN TRANSIT</Badge>
                </div>
                <div className="flex items-center gap-6">
                   <p className="text-sm font-medium text-muted uppercase tracking-widest">Est. Delivery: <span className="text-text font-bold">12:30 PM Today</span></p>
                </div>
             </div>
             <div className="flex gap-4">
                <Button variant="outline" className="rounded-2xl border-border bg-white h-14 px-8">
                   <FileText className="w-4 h-4 mr-2" /> View Batch Logs
                </Button>
                <Button className="rounded-2xl h-14 px-8 shadow-xl shadow-secondary/20">
                   <Share2 className="w-4 h-4 mr-2" /> Share Journey
                </Button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
             {/* Left: Map & Purity */}
             <div className="lg:col-span-7 space-y-12">
                <TrackingMapMock />
                
                <section className="bg-white p-10 rounded-[3rem] border border-border shadow-sm">
                   <div className="flex items-center justify-between mb-10">
                      <div>
                         <h3 className="text-2xl font-display font-black text-text tracking-tight">Path to Purity</h3>
                         <p className="text-xs font-bold text-muted mt-1 uppercase tracking-widest">Verified Provenance Log</p>
                      </div>
                      <CertificationBadge type="NPOP" size="lg" />
                   </div>

                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-5 bg-cream/50 rounded-2xl border border-border/50">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                               1
                            </div>
                            <div>
                               <p className="text-xs font-black uppercase text-text">Harvesting</p>
                               <p className="text-[11px] text-muted">Sanga Reddy Field #12B by Rao Family</p>
                            </div>
                         </div>
                         <span className="text-[10px] font-bold text-muted">Verified Log</span>
                      </div>
                      <div className="flex items-center justify-between p-5 bg-cream/50 rounded-2xl border border-border/50 opacity-50">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-white">
                               2
                            </div>
                            <div>
                               <p className="text-xs font-black uppercase text-text">Quality Lab Check</p>
                               <p className="text-[11px] text-muted">Pesticide & Heavy Metal Audit - Result: CLEAN</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </section>
             </div>

             {/* Right: Activity Feed */}
             <div className="lg:col-span-5 space-y-10">
                <Card className="p-10 border-none shadow-2xl rounded-[3rem] bg-white">
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted mb-10">Real-time Feed</h3>
                   <TrackingTimeline />
                </Card>

                <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20 flex flex-col items-center text-center space-y-6">
                   <Smartphone className="w-12 h-12 text-secondary" />
                   <div>
                      <h4 className="text-xl font-display font-bold text-text">Get Harvest SMS Alerts</h4>
                      <p className="text-xs font-medium text-muted mt-2">Receive high-fidelity photo proof of your batch being handled at every zone hub.</p>
                   </div>
                   <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary rounded-xl">Enable Live Alerts</Button>
                </div>
             </div>
          </div>
       </div>

    </main>
  )
}
