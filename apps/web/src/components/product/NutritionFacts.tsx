"use client"

import React from 'react'

interface NutritionFactsProps {
  facts: {
    servingSize: string
    calories: number
    protein: string
    carbs: string
    fat: string
    fiber: string
    sugar: string
    sodium: string
  }
}

export default function NutritionFacts({ facts }: NutritionFactsProps) {
  if (!facts) return null

  const items = [
    { label: 'Calories', value: facts.calories },
    { label: 'Total Fat', value: facts.fat },
    { label: 'Total Carbohydrates', value: facts.carbs },
    { label: 'Protein', value: facts.protein, highlight: true },
    { label: 'Dietary Fiber', value: facts.fiber, highlight: true },
    { label: 'Sugars', value: facts.sugar },
    { label: 'Sodium', value: facts.sodium },
  ]

  return (
    <div className="max-w-md bg-white rounded-3xl border-4 border-text overflow-hidden shadow-xl font-sans">
      <div className="bg-text p-6 text-white">
        <h3 className="text-3xl font-black uppercase tracking-tighter">Nutrition Facts</h3>
        <p className="text-sm font-bold opacity-70">Serving Size: {facts.servingSize}</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-end border-b-8 border-text pb-2 mb-4">
          <span className="text-sm font-black uppercase">Amount Per Serving</span>
          <span className="text-4xl font-black">{facts.calories}</span>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div 
              key={item.label} 
              className={`flex items-center justify-between py-2 border-b border-border last:border-none ${
                item.highlight ? "bg-primary/5 -mx-2 px-2 rounded-lg" : ""
              }`}
            >
              <span className={`text-sm ${item.highlight ? "font-black text-primary" : "font-bold text-muted"}`}>
                {item.label}
              </span>
              <span className={`text-sm ${item.highlight ? "font-black text-primary" : "font-black text-text"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <p className="pt-6 text-[10px] font-bold text-muted italic leading-tight">
          * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
        </p>
      </div>
    </div>
  )
}
