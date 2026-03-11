import { prisma } from '../../config/database'
import { redis } from '../../config/redis'
import { PlatformMode } from '@prisma/client'
import { StorefrontData } from '@next360/types/cms'

/**
 * Get all data for the home page based on zone and mode
 */
export async function getStorefrontData(zoneId: string, mode: PlatformMode): Promise<StorefrontData> {
  const cacheKey = `storefront:${zoneId}:${mode}`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const now = new Date()

  // 1. Fetch all components in parallel
  const [
    announcements,
    banners,
    marqueeItems,
    flashSale,
    featuredSlotsRaw,
    popup,
    sections,
    testimonials,
    modeConfigs
  ] = await Promise.all([
    // Announcements
    prisma.announcement.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] },
          { OR: [{ startsAt: { lte: now } }, { startsAt: null }] },
          { OR: [{ endsAt: { gte: now } }, { endsAt: null }] }
        ]
      }
    }),

    // Banners
    prisma.banner.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] },
          { OR: [{ startsAt: { lte: now } }, { startsAt: null }] },
          { OR: [{ endsAt: { gte: now } }, { endsAt: null }] }
        ]
      },
      include: { product: { include: { category: true } } },
      orderBy: { displayOrder: 'asc' }
    }),

    // Marquee
    prisma.marqueeItem.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] }
        ]
      },
      orderBy: { displayOrder: 'asc' }
    }),

    // Flash Sale
    prisma.flashSale.findFirst({
      where: {
        isActive: true,
        showOnHome: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] }
        ],
        endsAt: { gte: now }
      }
    }),

    // Featured Slots
    prisma.featuredSlot.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] }
        ]
      },
      include: { product: { include: { category: true } } },
      orderBy: { displayOrder: 'asc' }
    }),

    // Popup
    prisma.promoPopup.findFirst({
      where: {
        isActive: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] },
          { OR: [{ startsAt: { lte: now } }, { startsAt: null }] },
          { OR: [{ endsAt: { gte: now } }, { endsAt: null }] }
        ]
      }
    }),

    // Sections Order
    prisma.homepageSection.findMany({
      where: {
        isVisible: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] }
        ]
      },
      orderBy: { displayOrder: 'asc' }
    }),

    // Testimonials
    prisma.testimonial.findMany({
      where: {
        isActive: true,
        AND: [
          { OR: [{ zoneId }, { zoneId: null }] },
          { OR: [{ mode }, { mode: null }] }
        ]
      },
      include: { product: true },
      orderBy: { displayOrder: 'asc' },
      take: 6
    }),

    // Available Modes for this zone
    prisma.zoneModeConfig.findMany({
      where: { zoneId, isEnabled: true }
    })
  ])

  // 2. Fetch products for Flash Sale if exists
  let flashSaleWithProducts = null
  if (flashSale) {
    const products = await prisma.product.findMany({
      where: { id: { in: flashSale.productIds } },
      include: { category: true }
    })
    flashSaleWithProducts = { ...flashSale, products }
  }

  // 3. Organise Featured Slots into sections
  const featuredSlots: any = {
    best_sellers: [],
    new_arrivals: [],
    on_sale: [],
    seasonal: []
  }

  featuredSlotsRaw.forEach(slot => {
    if (featuredSlots[slot.section]) {
      featuredSlots[slot.section].push(slot.product)
    }
  })

  const result: any = {
    announcements,
    banners,
    marqueeItems,
    flashSale: flashSaleWithProducts,
    featuredSlots,
    popup,
    sections,
    testimonials,
    modes: modeConfigs
  }

  // 4. Cache result for 5 minutes
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60)
  return result
}

/**
 * Get active Rythu batches for a zone
 */
export async function getRythuBatches(zoneId: string) {
  const now = new Date()
  return prisma.rythuBatch.findMany({
    where: {
      zoneId,
      isActive: true,
      closesAt: { gte: now },
      availableQty: { gt: 0 }
    },
    include: {
      product: { include: { category: true } },
      farmer: true
    },
    orderBy: { harvestDate: 'desc' }
  })
}

/**
 * Get available coupons for storefront
 */
export async function getAvailableCoupons() {
  const now = new Date()
  return prisma.coupon.findMany({
    where: {
      isActive: true,
      expiresAt: { gt: now },
      OR: [
        { maxUses: 0 }, // Unlimited
        { usedCount: { lt: prisma.coupon.fields.maxUses } }
      ]
    },
    orderBy: { minOrder: 'asc' }
  })
}
