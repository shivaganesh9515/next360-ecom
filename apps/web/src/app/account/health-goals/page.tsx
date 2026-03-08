"use client"

import React, { useState } from 'react'
import { MOCK_USER } from '@/lib/mockAccount'
import { HEALTH_GOALS } from '@next360/utils'
import HealthGoalCard from '@/components/account/HealthGoalCard'
import ProductCard from '@/components/product/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/mockData'
import { Button } from '@next360/ui'
import { toast } from 'sonner'
import { Target, Sparkles } from 'lucide-react'

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
    <div className="space-y-6">
      {/* SECTION 1 - Goal Selector */}
      <div className="bg-white rounded-[2rem] border border-border p-6 md:p-8 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-inner">
          <Target size={32} />
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-black text-text mb-2">
          Select Your Health Goals
        </h1>
        <p className="text-muted font-medium max-w-lg mx-auto mb-8">
          Tell us what you want to achieve, and we'll personalize your Next360 organic product recommendations.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
          variant="primary" 
          className="h-14 px-12 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Health Goals'}
        </Button>
      </div>

      {/* SECTION 2 - Recommended Products */}
      <div className="bg-gradient-to-br from-cream to-white rounded-[2rem] border border-border p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-secondary" size={24} />
          <h2 className="font-display text-2xl font-black text-text">
            Recommended for Your Goals
          </h2>
        </div>

        {selectedGoals.length === 0 ? (
          <div className="py-12 text-center bg-white/50 rounded-2xl border border-dashed border-border/60">
            <p className="text-muted font-bold uppercase tracking-widest text-sm">
              Select goals above to see curated recommendations ✨
            </p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 scrollbar-hide snap-x">
            {recommendedProducts.map(product => (
              <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
