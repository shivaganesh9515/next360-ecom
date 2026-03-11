import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

const variants = {
  organic: 'bg-secondary/10 text-secondary border-secondary/20',
  fresh: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  local: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  default: 'bg-white/5 text-white/60 border-white/10',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-widest',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
