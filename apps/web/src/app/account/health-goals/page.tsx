"use client"

import React, { useState } from 'react'
import { MOCK_USER } from '@/lib/mockAccount'
import { HEALTH_GOALS } from '@next360/utils'
import HealthGoalCard from '@/components/account/HealthGoalCard'
import ProductCard from '@/components/product/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/mockData'
import { Button } from '@next360/ui'
import { toast } from 'sonner'
import { ChevronRight, Sparkles, Target } from 'lucide-react'

export default function HealthGoalsPage() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(MOCK_USER.healthGoals)
  const [isSaving, setIsSaving] = useState(false)

  const handleToggle = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) 
        ? prev.filter(g => g !== id)
        : [...prev, id]
    )
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success('Health goals updated!')
    }, 1000)
  }

  // Filter products based on selected goals. 
  // We'll mock this by picking random products seeded by the selected goals length to show "recommendations"
  // Since products don't natively have health tag arrays in mockData.ts yet, we just slice.
  const recommendedProducts = selectedGoals.length === 0 
    ? [] 
    : MOCK_PRODUCTS.slice(0, Math.min(6, selectedGoals.length * 2))

  return (
    <div className="space-y-12">
      {/* SECTION 1 - Goal Selector */}
      <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-20 shadow-2xl shadow-slate-200/40 text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-colors" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-[2rem] bg-slate-50 text-primary flex items-center justify-center mx-auto mb-10 shadow-inner border border-slate-100 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Target size={40} strokeWidth={2.5} />
          </div>
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-4 justify-center italic">
              <span className="w-12 h-[2.5px] bg-primary" /> Bio-Metric Logic
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 italic tracking-tighter leading-none">
            Vector Alignment <span className="text-primary italic">Strategy</span>
          </h1>
          <p className="text-slate-400 font-bold max-w-lg mx-auto mb-16 text-lg leading-relaxed">
            Define your operational health objectives. Our system will recalibrate the fleet to optimize your organic resource recommendations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {HEALTH_GOALS.map(goal => (
              <HealthGoalCard
                key={goal.id}
                goal={goal}
                isSelected={selectedGoals.includes(goal.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>

          <Button 
            className="h-20 px-16 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transition-all active:scale-95"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Recalibrating...' : 'Synchronize Goals'}
          </Button>
        </div>
      </div>

      {/* SECTION 2 - Recommended Products */}
      <div className="bg-slate-900 text-white rounded-[3rem] border border-slate-800 p-8 md:p-16 shadow-2xl relative overflow-hidden group/recs">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mb-48 -mr-48 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 rotate-3">
               <Sparkles className="text-slate-900" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter leading-none">Crated Recommendations</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 italic">Logic-Driven Resource Mapping</p>
            </div>
          </div>
          
          <div className="hidden md:flex gap-4">
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all cursor-pointer">
                <ChevronRight className="rotate-180" size={20} />
             </div>
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all cursor-pointer">
                <ChevronRight size={20} />
             </div>
          </div>
        </div>

        {selectedGoals.length === 0 ? (
          <div className="py-24 text-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/10 relative z-10 transition-all duration-500 hover:bg-white/10">
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs italic">
              Input goal parameters to activate recommendation node ✨
            </p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x relative z-10">
            {recommendedProducts.map((product, i) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-start transition-all duration-700" style={{ transitionDelay: `${i * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
            <div className="min-w-[100px] shrink-0" />
          </div>
        )}
      </div>
    </div>
  )
}
