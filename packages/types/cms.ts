import type { PlatformMode } from './location'
import type { Product } from './product'

// ─── ANNOUNCEMENT BAR ─────────────────────────────────────────

export interface AnnouncementMessage {
  text: string
  link?: string
  bold?: boolean
}

export interface Announcement {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  messages: AnnouncementMessage[]
  bgColor: string
  textColor: string
  rotateEvery: number
  isActive: boolean
  startsAt?: string | null
  endsAt?: string | null
}

// ─── HERO BANNER ──────────────────────────────────────────────

export interface Banner {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  title: string
  subtitle?: string | null
  description?: string | null
  desktopImageUrl: string
  mobileImageUrl?: string | null
  overlayColor?: string | null
  ctaText: string
  ctaLink: string
  badgeText?: string | null
  productId?: string | null
  product?: Product | null
  displayOrder: number
  isActive: boolean
  startsAt?: string | null
  endsAt?: string | null
}

// ─── MARQUEE TICKER ───────────────────────────────────────────

export interface MarqueeItem {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  text: string
  emoji?: string | null
  link?: string | null
  displayOrder: number
  isActive: boolean
}

// ─── FLASH SALE ───────────────────────────────────────────────

export interface FlashSale {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  title: string
  productIds: string[]
  categoryId?: string | null
  discountType: 'PERCENT' | 'FLAT'
  discountValue: number
  endsAt: string
  isActive: boolean
  showOnHome: boolean
  showOnShop: boolean
  products?: Product[]
}

// ─── FEATURED SLOT ────────────────────────────────────────────

export type FeaturedSection = 'best_sellers' | 'new_arrivals' | 'on_sale' | 'seasonal'

export interface FeaturedSlot {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  section: FeaturedSection
  productId: string
  product?: Product
  displayOrder: number
  isActive: boolean
}

// ─── PROMO POPUP ──────────────────────────────────────────────

export interface PromoPopup {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  imageUrl?: string | null
  title: string
  description?: string | null
  couponCode?: string | null
  ctaText: string
  ctaLink?: string | null
  delaySeconds: number
  showOnce: boolean
  isActive: boolean
  startsAt?: string | null
  endsAt?: string | null
}

// ─── HOMEPAGE SECTION ─────────────────────────────────────────

export type SectionKey =
  | 'hero'
  | 'marquee'
  | 'modes'
  | 'category_strip'
  | 'featured_products'
  | 'flash_sale'
  | 'why_us'
  | 'subscription_banner'
  | 'seasonal'
  | 'testimonials'
  | 'impact_numbers'
  | 'blog_teaser'
  | 'newsletter'
  | 'rythu_batch'
  | 'farmer_profiles'
  | 'batch_countdown'

export interface HomepageSection {
  id?: string
  zoneId?: string | null
  mode?: PlatformMode | null
  sectionKey: SectionKey
  isVisible: boolean
  displayOrder: number
}

// ─── TESTIMONIAL ──────────────────────────────────────────────

export interface Testimonial {
  id: string
  zoneId?: string | null
  mode?: PlatformMode | null
  name: string
  city: string
  avatarUrl?: string | null
  rating: number
  text: string
  productId?: string | null
  product?: Product | null
  isActive: boolean
  displayOrder: number
}

// ─── RYTHU BATCH ──────────────────────────────────────────────

export interface RythuBatch {
  id: string
  zoneId: string
  productId: string
  farmerId: string
  product?: Product
  farmerName?: string
  farmerCity?: string
  batchQty: number
  availableQty: number
  harvestDate: string
  closesAt: string
  pricePerUnit: number
  isActive: boolean
}

// ─── STOREFRONT AGGREGATE ─────────────────────────────────────

export interface StorefrontData {
  announcements: Announcement[]
  banners: Banner[]
  marqueeItems: MarqueeItem[]
  flashSale: FlashSale | null
  featuredSlots: {
    best_sellers: Product[]
    new_arrivals: Product[]
    on_sale: Product[]
    seasonal: Product[]
  }
  popup: PromoPopup | null
  sections: HomepageSection[]
  testimonials: Testimonial[]
  modes: import('./location').ZoneModeConfig[]
}
