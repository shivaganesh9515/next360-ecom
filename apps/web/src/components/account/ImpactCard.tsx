import React from 'react'

interface ImpactCardProps {
  icon: string
  value: string | number
  unit: string
  label: string
  description: string
  color: 'green' | 'blue' | 'amber' | 'earth'
}

export default function ImpactCard({ icon, value, unit, label, description, color }: ImpactCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-display text-3xl font-black text-primary leading-none mb-1">
        {value}<span className="text-xl ml-0.5">{unit}</span>
      </div>
      <p className="font-bold text-slate-800 text-sm mb-1">{label}</p>
      <p className="text-xs text-slate-500 font-medium">{description}</p>
    </div>
  )
}
