"use client"

import React from 'react'
import { Download, Instagram, Leaf } from 'lucide-react'
import { MOCK_IMPACT, MOCK_USER } from '@/lib/mockAccount'
import ImpactCard from '@/components/account/ImpactCard'
import { Button } from '@next360/ui'
import { toast } from 'sonner'
import Image from 'next/image'

export default function ImpactPage() {
  const memberSince = new Date(MOCK_USER.createdAt).toLocaleDateString('en-IN', {
    month: 'long', year: 'numeric'
  })

  return (
    <div className="space-y-12">
      {/* SECTION 1 - Impact Hero */}
      <div className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-primary/30 transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-1000" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-white/10 mb-10 italic">
            <span className="w-8 h-[2px] bg-primary" /> Global Matrix Impact
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 italic tracking-tighter leading-none">
            Node Performance <span className="text-primary italic">Summary</span>
          </h1>
          <p className="text-slate-400 text-lg font-bold mb-12 max-w-lg mx-auto leading-relaxed">
            Your fleet operations are actively optimizing local farmer ecosystems and reducing environmental entropy.
          </p>
          <div className="inline-block px-8 py-3 bg-primary text-slate-900 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20">
            Active since {memberSince}
          </div>
        </div>
      </div>

      {/* SECTION 2 - Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ImpactCard
          icon="👨‍🌾"
          value={MOCK_IMPACT.farmersSupported}
          unit=""
          label="Farmer Nodes"
          description="Ecosystem participants supported"
          color="earth"
        />
        <ImpactCard
          icon="🌱"
          value={MOCK_IMPACT.organicOrders}
          unit=""
          label="Manifests"
          description="100% organic deployments logged"
          color="green"
        />
        <ImpactCard
          icon="🧪"
          value={MOCK_IMPACT.pesticidesAvoided}
          unit="g"
          label="Toxic Bypass"
          description="Pesticide exposure mitigation"
          color="amber"
        />
        <ImpactCard
          icon="💧"
          value={MOCK_IMPACT.waterSaved.toLocaleString()}
          unit="L"
          label="Resource Save"
          description="Hydration saved vs conventional"
          color="blue"
        />
        <ImpactCard
          icon="📦"
          value={MOCK_IMPACT.plasticFreeDeliveries}
          unit=""
          label="Zero Polymer"
          description="Plastic-free deployment nodes"
          color="earth"
        />
        <ImpactCard
          icon="🌍"
          value={MOCK_IMPACT.carbonSaved}
          unit="kg"
          label="CO₂ Offset"
          description="Carbon footprint optimization"
          color="green"
        />
      </div>

      {/* SECTION 3 - Share Impact Card */}
      <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-20 shadow-2xl shadow-slate-200/40 relative overflow-hidden group/share">
        <div className="absolute top-0 left-0 w-32 h-32 bg-slate-50 rounded-full -ml-16 -mt-16 blur-2xl group-hover/share:bg-slate-100 transition-colors" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 flex items-center gap-4 italic justify-center lg:justify-start">
               <span className="w-12 h-[2.5px] bg-primary" /> Broadcast Signal
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 italic tracking-tighter leading-none">Global Awareness Protocol</h2>
            <p className="text-slate-400 font-bold mb-12 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
               Transmit your personalized operational metrics to the social grid. Inspire the collective toward sustainable fleet management.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Button 
                onClick={() => toast.success("Visual node download sequence starting... 🌿")}
                className="h-20 px-12 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20"
              >
                <Download size={18} strokeWidth={3} className="mr-3" />
                Capture Visual
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast.success("Transmission frequency active 📸")}
                className="h-20 px-12 border-slate-100 text-slate-900 rounded-full font-black text-xs uppercase tracking-[0.2em] bg-white hover:border-slate-900 shadow-xl transition-all"
              >
                <Instagram size={18} strokeWidth={3} className="mr-3" />
                Transmit Link
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Instagram Story Preview */}
            <div className="w-[320px] h-[580px] bg-slate-900 rounded-[3rem] p-10 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center justify-between transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 cursor-pointer group/mobile">
               {/* Pattern */}
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #16a34a 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover/mobile:bg-primary/20 transition-colors" />
               
               <div className="relative z-10 w-full flex flex-col items-center text-center mt-12">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center mb-8 rotate-3">
                   <Leaf className="text-primary" size={32} strokeWidth={2.5} />
                 </div>
                 
                 <h3 className="text-3xl font-black mb-3 italic tracking-tighter leading-none">Operational<br/><span className="text-primary italic">Impact</span></h3>
                 <div className="px-5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-yellow-400 mb-12 italic">
                   {MOCK_USER.name}
                 </div>

                 <div className="space-y-6 w-full">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 w-full border border-white/10 flex flex-col items-center group-hover/mobile:bg-white/10 transition-colors">
                      <p className="text-4xl font-black mb-1 italic tracking-tighter text-primary">{MOCK_IMPACT.farmersSupported}</p>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Farmer Nodes Supported</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 w-full border border-white/10 flex flex-col items-center group-hover/mobile:bg-white/10 transition-colors">
                      <p className="text-4xl font-black mb-1 italic tracking-tighter text-primary">{MOCK_IMPACT.pesticidesAvoided}g</p>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Toxic Bypass Active</p>
                    </div>
                 </div>
               </div>

               <div className="relative z-10 mb-4 text-center">
                 <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Next360 Logistics</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
