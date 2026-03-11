'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, ShieldCheck, MapPin } from 'lucide-react'
import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'
import { CertificationBadge } from './CertificationBadge'
import { cn } from '@next360/utils'
// Placeholder comment for context import path till we port it
import { useAuth } from '../../../apps/web/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export interface Product {
  id?: string | number
  name: string
  image?: string
  images?: string[]
  img?: string
  price: number
  originalPrice?: number
  discount?: number
  category?: string
  certified?: string
  certification?: 'NPOP' | 'PGS' | 'FSSAI' | 'ISO22000' | 'PENDING' | 'EXPIRED'
  origin?: string
  location?: string
  farmer?: string
  rating?: string | number
  harvest?: string
}

export interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const displayImage = product.image || (product.images && product.images[0]) || product.img;
  const isEmoji = typeof displayImage === 'string' && displayImage.length <= 2;
  const { user } = useAuth();
  const router = useRouter();

  const handleProtectedAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to add items to your cart");
      router.push('/login');
    } else {
      toast.success("Added to cart!");
    }
  }

  if (layout === 'list') {
    return (
      <Card className="flex items-center gap-6 p-4 hover:shadow-xl transition-all group">
         <div className="w-32 h-32 rounded-2xl overflow-hidden bg-cream flex-shrink-0 flex items-center justify-center">
            {isEmoji ? (
              <span className="text-6xl">{displayImage}</span>
            ) : (
              <img src={displayImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            )}
         </div>
         <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
               <Badge variant="organic" size="sm">{product.category}</Badge>
               <CertificationBadge type={(product.certification || product.certified || 'NPOP') as any} size="sm" />
            </div>
            <h3 className="text-xl font-display font-bold text-text">{product.name}</h3>
            <p className="text-xs text-muted mt-1 flex items-center gap-1">
               <MapPin className="w-3 h-3" /> {product.origin || product.location || 'Kurnool District'}
            </p>
            {product.farmer && (
              <p className="text-[10px] text-muted font-medium mt-1 uppercase tracking-tighter">🌾 {product.farmer}</p>
            )}
         </div>
         <div className="text-right flex flex-col gap-3">
            <span className="text-2xl font-black font-sans text-primary">₹{product.price}</span>
            <Button onClick={handleProtectedAction} size="sm" className="rounded-xl">Add <ShoppingCart className="w-4 h-4 ml-1" /></Button>
         </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card hover padding="p-0" className="group flex flex-col h-[480px]">
        {/* Image Area */}
        <div className="relative h-64 bg-cream overflow-hidden flex items-center justify-center">
          {isEmoji ? (
            <span className="text-8xl">{displayImage}</span>
          ) : (
            <img 
              src={displayImage} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
          )}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-muted hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          {(product.discount || (product.originalPrice && product.originalPrice > product.price)) && (
            <div className="absolute top-4 left-4">
              <Badge variant="sale">-{product.discount || Math.round((1 - product.price / (product.originalPrice || product.price)) * 100)}%</Badge>
            </div>
          )}
          
          {/* Quick Actions Hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
             <Button onClick={handleProtectedAction} className="w-full bg-white/90 backdrop-blur-md border border-white text-primary hover:bg-white h-12 shadow-xl">
                Quick Add <ShoppingCart className="w-4 h-4 ml-2" />
             </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs font-bold text-text">{product.rating || '4.8'}</span>
            </div>
          </div>

          <h3 className="text-lg font-display font-bold leading-tight text-text line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 text-[10px] text-muted font-medium mb-4">
             <MapPin className="w-3 h-3" />
             <span>{product.origin || product.location || 'Andhra Pradesh'}</span>
             <span className="mx-1">•</span>
             <span className="text-secondary font-bold uppercase tracking-tighter">
               {product.harvest ? `Harvested ${product.harvest}` : 'Harvested 6h ago'}
             </span>
          </div>
          {product.farmer && (
             <div className="text-[9px] font-black text-muted uppercase tracking-widest mb-4">
               Producer: {product.farmer}
             </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted line-through">₹{product.originalPrice || product.price + 40}</span>
              <span className="text-xl font-black font-sans text-primary leading-none">₹{product.price}</span>
            </div>
            <CertificationBadge type={product.certification || 'NPOP'} className="scale-90 origin-right" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export { ProductCard }
