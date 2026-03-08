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
    <div className="space-y-6">
      {/* SECTION 1 - Impact Hero */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-[2rem] p-8 md:p-12 text-center shadow-xl shadow-secondary/20 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-xl mx-auto">
          <Leaf size={40} className="mx-auto mb-4 opacity-90 text-yellow-300" />
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">🌍 Your Organic Impact</h1>
          <p className="text-white/90 text-lg font-medium mb-6">
            Every order you place helps the environment, supports local farmers, and promotes sustainable living.
          </p>
          <div className="inline-block px-4 py-2 bg-black/10 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-widest border border-white/10">
            Member since {memberSince}
          </div>
        </div>
      </div>

      {/* SECTION 2 - Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ImpactCard
          icon="👨‍🌾"
          value={MOCK_IMPACT.farmersSupported}
          unit=""
          label="Farmers"
          description="Farmers directly supported"
          color="earth"
        />
        <ImpactCard
          icon="🌱"
          value={MOCK_IMPACT.organicOrders}
          unit=""
          label="Orders"
          description="100% organic orders placed"
          color="green"
        />
        <ImpactCard
          icon="🧪"
          value={MOCK_IMPACT.pesticidesAvoided}
          unit="g"
          label="Avoided"
          description="Pesticide exposure avoided"
          color="amber"
        />
        <ImpactCard
          icon="💧"
          value={MOCK_IMPACT.waterSaved.toLocaleString()}
          unit="L"
          label="Saved"
          description="Water saved vs conventional"
          color="blue"
        />
        <ImpactCard
          icon="📦"
          value={MOCK_IMPACT.plasticFreeDeliveries}
          unit=""
          label="Deliveries"
          description="Plastic-free deliveries"
          color="earth"
        />
        <ImpactCard
          icon="🌍"
          value={MOCK_IMPACT.carbonSaved}
          unit="kg"
          label="CO₂ Saved"
          description="Carbon footprint reduced"
          color="green"
        />
      </div>

      {/* SECTION 3 - Share Impact Card */}
      <div className="bg-cream rounded-[2.5rem] border border-white p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-black text-primary mb-4">Share Your Impact!</h2>
            <p className="text-muted font-medium mb-8 text-lg">
              Inspire others to join the organic movement. Share your personalized impact summary on social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                onClick={() => toast.success("Impact card download coming soon 🌿")}
                className="h-14 px-8 rounded-2xl font-black shadow-xl shadow-primary/20"
              >
                <Download size={18} className="mr-2" />
                Download Card
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast.success("Share feature coming soon 📸")}
                className="h-14 px-8 border-primary text-primary rounded-2xl font-black bg-transparent hover:bg-primary/5"
              >
                <Instagram size={18} className="mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Instagram Story Preview */}
            <div className="w-[280px] h-[500px] bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-500 cursor-pointer">
               {/* Pattern */}
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
               
               <div className="relative z-10 w-full flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mb-6">
                   <Leaf className="text-primary" size={24} />
                 </div>
                 
                 <h3 className="font-display text-2xl font-black mb-2 leading-tight">My Organic<br/>Impact</h3>
                 <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300 mb-8">{MOCK_USER.name}</p>

                 <div className="space-y-4 w-full">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 w-full border border-white/10">
                      <p className="text-3xl font-display font-black mb-0.5">{MOCK_IMPACT.farmersSupported}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Farmers Supported</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 w-full border border-white/10">
                      <p className="text-3xl font-display font-black mb-0.5">{MOCK_IMPACT.pesticidesAvoided}g</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Pesticides Avoided</p>
                    </div>
                 </div>

                 <div className="mt-10 pt-6 border-t border-white/20 w-full">
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Powered by Next360</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
