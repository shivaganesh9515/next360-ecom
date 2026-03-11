import { cn } from '@/lib/utils'
import { ShieldCheck } from 'lucide-react'

const certConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  NPOP:  { label: 'NPOP', color: 'text-secondary',     bg: 'bg-secondary/10',  border: 'border-secondary/30' },
  PGS:   { label: 'PGS',  color: 'text-blue-400',      bg: 'bg-blue-400/10',   border: 'border-blue-400/30' },
  FSSAI: { label: 'FSSAI',color: 'text-amber-400',     bg: 'bg-amber-400/10',  border: 'border-amber-400/30' },
  ISO:   { label: 'ISO',  color: 'text-purple-400',    bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
}

const sizes = {
  sm: { badge: 'px-2 py-0.5 text-[9px] gap-1', icon: 'w-2.5 h-2.5' },
  md: { badge: 'px-3 py-1 text-[10px] gap-1.5', icon: 'w-3 h-3' },
  lg: { badge: 'px-4 py-1.5 text-xs gap-2', icon: 'w-3.5 h-3.5' },
}

interface CertificationBadgeProps {
  type: string
  size?: keyof typeof sizes
  className?: string
}

export function CertificationBadge({ type, size = 'md', className }: CertificationBadgeProps) {
  const cert = certConfig[type] ?? { label: type, color: 'text-white/50', bg: 'bg-white/5', border: 'border-white/10' }
  const s = sizes[size]

  return (
    <span className={cn(
      'inline-flex items-center rounded-xl border font-black uppercase tracking-widest',
      cert.color, cert.bg, cert.border,
      s.badge,
      className
    )}>
      <ShieldCheck className={s.icon} strokeWidth={2.5} />
      {cert.label}
    </span>
  )
}
