import React from 'react'
import { Check } from 'lucide-react'

interface HealthGoalCardProps {
  goal: { id: string, label: string, emoji: string }
  isSelected: boolean
  onToggle: (id: string) => void
}

export default function HealthGoalCard({ goal, isSelected, onToggle }: HealthGoalCardProps) {
  return (
    <div 
      onClick={() => onToggle(goal.id)}
      className={`
        relative border-2 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 transform
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[0.98]' 
          : 'border-slate-100 bg-white hover:border-secondary/50 hover:bg-slate-50'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white">
          <Check size={12} strokeWidth={3} />
        </div>
      )}
      
      <div className={`text-4xl mb-3 transition-transform ${isSelected ? 'scale-110' : ''}`}>
        {goal.emoji}
      </div>
      
      <h3 className={`text-sm font-bold uppercase tracking-wider ${isSelected ? 'text-primary' : 'text-slate-600'}`}>
        {goal.label}
      </h3>
    </div>
  )
}
