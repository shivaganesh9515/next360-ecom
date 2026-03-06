import React from 'react'
import { Badge } from '@next360/ui'
import { Check } from 'lucide-react'
import { SEEDS_LEVELS } from '@next360/utils'

interface SeedsProgressProps {
  seeds: number
  compact?: boolean
}

export default function SeedsProgress({ seeds, compact = false }: SeedsProgressProps) {
  // Compute current level
  let currentLevel: typeof SEEDS_LEVELS[number] = SEEDS_LEVELS[0]
  let nextLevel: typeof SEEDS_LEVELS[number] = SEEDS_LEVELS[1] || SEEDS_LEVELS[0]

  for (let i = 0; i < SEEDS_LEVELS.length; i++) {
    if (seeds >= SEEDS_LEVELS[i].min) {
      currentLevel = SEEDS_LEVELS[i]
      nextLevel = SEEDS_LEVELS[i + 1] || SEEDS_LEVELS[i]
    }
  }

  const isMaxLevel = currentLevel.name === nextLevel.name
  const progressPercent = isMaxLevel 
    ? 100 
    : ((seeds - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100

  const seedsToNext = nextLevel.min - seeds

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="fresh" className="bg-secondary/10 text-secondary border-none font-black px-2 py-0.5 text-xs">
          🌱 {seeds.toLocaleString()}
        </Badge>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {currentLevel.name.split(' ')[1] || currentLevel.name}
        </span>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white shadow-xl shadow-secondary/20 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-2.5 py-1 bg-white/20 rounded-lg text-xs font-black uppercase tracking-widest mb-2 backdrop-blur-md border border-white/20">
              {currentLevel.name} Level
            </span>
            <h2 className="font-display text-4xl font-black">🌱 {seeds.toLocaleString()}</h2>
            <p className="text-white/80 text-sm font-medium mt-1">Total seeds earned</p>
          </div>
        </div>

        {!isMaxLevel && (
          <div className="mt-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
                {seedsToNext.toLocaleString()} seeds to {nextLevel.name}
              </span>
              <span className="text-xs font-black">{Math.min(100, Math.round(progressPercent))}%</span>
            </div>
            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-md">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                style={{ width: `${Math.min(100, progressPercent)}%` }}
              />
            </div>
          </div>
        )}

        {/* Levels Timeline */}
        <div className="mt-8 flex justify-between items-center relative z-0">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/20 -z-10" />
          
          {SEEDS_LEVELS.map((level, idx) => {
            const isPast = seeds >= level.min
            const isCurrent = currentLevel.name === level.name

            return (
              <div key={level.name} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  isCurrent ? 'bg-white text-primary scale-125 shadow-lg' :
                  isPast ? 'bg-yellow-400 text-white' :
                  'bg-black/20 text-white/50 backdrop-blur-md'
                }`}>
                  {isPast && !isCurrent ? <Check size={14} strokeWidth={4} /> : idx + 1}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${
                  isCurrent ? 'text-white' : 'text-white/50'
                }`}>
                  {level.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
