'use client'

import { Compass, Sprout, Store } from 'lucide-react'
import type { ZoneModeConfig } from '@next360/types/location'

const icons = [Compass, Sprout, Store]

export default function ModeHighlights({ modes }: { modes: ZoneModeConfig[] }) {
  if (!modes.length) return null

  return (
    <section className="px-4 py-6 md:px-6">
      <div className="mx-auto grid max-w-[1240px] gap-4 md:grid-cols-3">
        {modes.map((mode, index) => {
          const Icon = icons[index % icons.length]
          return (
            <div key={mode.id} className="rounded-[28px] border border-black/5 bg-white/80 p-6 shadow-[0_20px_45px_rgba(20,35,27,0.06)]">
              <div className="mb-4 inline-flex rounded-2xl p-3" style={{ backgroundColor: `${mode.accentColor ?? '#21513A'}14` }}>
                <Icon className="h-5 w-5" style={{ color: mode.accentColor ?? '#21513A' }} />
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted">Mode architecture</div>
              <h3 className="mt-2 text-2xl font-semibold text-text">{mode.label ?? mode.mode}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{mode.description ?? 'Location-aware merchandising and delivery rules.'}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
