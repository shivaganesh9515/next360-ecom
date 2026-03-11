import { cn } from '@next360/utils'

export interface CertificationBadgeProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type: 'NPOP' | 'PGS' | 'FSSAI' | 'ISO22000' | 'PENDING' | 'EXPIRED' | string
  status?: 'VALID' | 'EXPIRED'
  size?: 'sm' | 'md' | 'lg'
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({ 
  type, 
  status = 'VALID', 
  onClick, 
  className,
  ...props 
}) => {
  const configs: Record<string, { label: string; icon: string; style: string }> = {
    NPOP: {
      label: 'NPOP Organic',
      icon: '✅',
      style: 'bg-green-50 border-green-200 text-green-700',
    },
    PGS: {
      label: 'PGS Organic',
      icon: '🌱',
      style: 'bg-lime-50 border-lime-200 text-lime-700',
    },
    FSSAI: {
      label: 'FSSAI Licensed',
      icon: '🛡️',
      style: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    ISO22000: {
      label: 'ISO 22000',
      icon: '⭐',
      style: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    PENDING: {
      label: 'Pending Verification',
      icon: '⏳',
      style: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    },
    EXPIRED: {
      label: 'Cert Expired',
      icon: '❌',
      style: 'bg-red-50 border-red-200 text-red-600',
    },
  }

  const config = status === 'EXPIRED' ? configs['EXPIRED'] : (configs[type] || configs['PENDING'])

  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-sans text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-200',
        config.style,
        className
      )}
      {...props}
    >
      <span>{config.icon}</span>
      {config.label}
    </button>
  )
}
