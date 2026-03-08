"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn, MOOD_OPTIONS } from '@next360/utils'

interface MoodSelectorProps {
  onMoodSelect: (goalTags: string[]) => void
}

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [activeMood, setActiveMood] = useState<string | null>(null)

  const handleMoodClick = (moodId: string, goals: readonly string[]) => {
    const isDeselect = activeMood === moodId
    const newMood = isDeselect ? null : moodId
    
    setActiveMood(newMood)
    onMoodSelect(isDeselect ? [] : [...goals])
  }

  return (
    <section className="py-12 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center font-display text-2xl md:text-3xl text-primary font-bold mb-10">
          What are you shopping for today?
        </h2>

        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {MOOD_OPTIONS.map((mood) => {
            const isActive = activeMood === mood.id
            
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodClick(mood.id, mood.goals)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border-2 transition-all duration-300 shrink-0",
                  isActive 
                    ? "bg-primary border-primary text-white shadow-md scale-105" 
                    : "bg-white border-border font-sans text-text hover:border-primary hover:text-primary"
                )}
              >
                <span className="text-xl">{mood.emoji}</span>
                {mood.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
