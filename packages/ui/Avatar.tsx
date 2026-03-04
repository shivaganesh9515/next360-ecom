import React from 'react'
import Image from 'next/image'
import { cn } from '@next360/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const bgColors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-red-100 text-red-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
]

const getInitials = (name: string) => {
  return name.substring(0, 2).toUpperCase()
}

const getDeterministicColor = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % bgColors.length
  return bgColors[index]
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  }

  const baseClass = 'relative flex items-center justify-center shrink-0 rounded-full overflow-hidden font-medium'

  if (src) {
    return (
      <div className={cn(baseClass, sizes[size], className)} {...props}>
        <Image src={src} alt={name || 'Avatar'} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(baseClass, sizes[size], getDeterministicColor(name), className)}
      title={name}
      {...props}
    >
      {getInitials(name)}
    </div>
  )
}
