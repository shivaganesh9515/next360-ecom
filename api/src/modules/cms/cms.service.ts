import { prisma } from '../../config/database'
import { redis } from '../../config/redis'
import { AppError } from '../../shared/errors/AppError'
import { PlatformMode } from '@prisma/client'

// --- Helper: Clear Storefront Cache ---
async function clearStorefrontCache(zoneId?: string | null, mode?: PlatformMode | null) {
  // If no zone/mode, we might need to clear many keys or use a pattern
  // For simplicity, we'll clear all storefront keys (or specific ones if provided)
  if (zoneId && mode) {
    await redis.del(`storefront:${zoneId}:${mode}`)
  } else {
    const keys = await redis.keys('storefront:*')
    if (keys.length > 0) await redis.del(...keys)
  }
}

// --- LOCATION MANAGEMENT ---

export async function upsertState(data: any) {
  return prisma.state.upsert({
    where: { code: data.code },
    update: data,
    create: data
  })
}

export async function upsertDistrict(data: any) {
  return prisma.district.upsert({
    where: { id: data.id || 'new' },
    update: data,
    create: data
  })
}

export async function upsertCity(data: any) {
  return prisma.city.upsert({
    where: { id: data.id || 'new' },
    update: data,
    create: data
  })
}

export async function upsertZone(data: any) {
  const { pincodes, ...zoneData } = data
  
  const zone = await prisma.zone.upsert({
    where: { id: data.id || 'new' },
    update: zoneData,
    create: zoneData
  })

  // Handle pincodes if provided
  if (pincodes && Array.isArray(pincodes)) {
    await prisma.zonePincode.deleteMany({ where: { zoneId: zone.id } })
    await prisma.zonePincode.createMany({
      data: pincodes.map((pin: string) => ({ zoneId: zone.id, pincode: pin }))
    })
  }

  return zone
}

export async function bulkImportPincodes(zoneId: string, pincodes: string[]) {
  return prisma.zonePincode.createMany({
    data: pincodes.map(p => ({ zoneId, pincode: p })),
    skipDuplicates: true
  })
}

export async function updateZoneModeConfig(zoneId: string, mode: PlatformMode, config: any) {
  const result = await prisma.zoneModeConfig.upsert({
    where: { zoneId_mode: { zoneId, mode } },
    update: config,
    create: { ...config, zoneId, mode }
  })
  await clearStorefrontCache(zoneId, mode)
  return result
}

// --- STOREFRONT CONTENT CRUD ---

export async function createAnnouncement(data: any) {
  const result = await prisma.announcement.create({ data })
  await clearStorefrontCache(data.zoneId, data.mode)
  return result
}

export async function updateAnnouncement(id: string, data: any) {
  const result = await prisma.announcement.update({ where: { id }, data })
  await clearStorefrontCache(result.zoneId, result.mode)
  return result
}

export async function deleteAnnouncement(id: string) {
  const item = await prisma.announcement.delete({ where: { id } })
  await clearStorefrontCache(item.zoneId, item.mode)
  return item
}

export async function upsertBanner(data: any) {
  const result = await prisma.banner.upsert({
    where: { id: data.id || 'new' },
    update: data,
    create: data
  })
  await clearStorefrontCache(result.zoneId, result.mode)
  return result
}

export async function reorderBanners(ids: string[]) {
  const updates = ids.map((id, index) => 
    prisma.banner.update({ where: { id }, data: { displayOrder: index } })
  )
  await Promise.all(updates)
  await clearStorefrontCache()
}

export async function upsertFlashSale(data: any) {
  const result = await prisma.flashSale.upsert({
    where: { id: data.id || 'new' },
    update: data,
    create: data
  })
  await clearStorefrontCache(result.zoneId, result.mode)
  return result
}

export async function upsertFeaturedSlot(data: any) {
  const result = await prisma.featuredSlot.upsert({
    where: { id: data.id || 'new' },
    update: data,
    create: data
  })
  await clearStorefrontCache(result.zoneId, result.mode)
  return result
}

export async function updateHomepageSections(zoneId: string | null, mode: PlatformMode | null, sections: any[]) {
  // Delete existing for this context
  await prisma.homepageSection.deleteMany({
    where: { zoneId, mode }
  })

  // Create new ones
  const result = await prisma.homepageSection.createMany({
    data: sections.map((s, i) => ({
      zoneId,
      mode,
      sectionKey: s.sectionKey,
      isVisible: s.isVisible,
      displayOrder: i
    }))
  })

  await clearStorefrontCache(zoneId, mode)
  return result
}

// --- RYTHU BATCHES ---

export async function upsertRythuBatch(data: any) {
  return prisma.rythuBatch.upsert({
    where: { id: data.id || 'new' },
    update: data,
    create: data
  })
}

// --- PRODUCT ZONE ASSIGNMENT ---

export async function assignProductToZones(productId: string, zoneIds: string[]) {
  await prisma.productZone.deleteMany({ where: { productId } })
  return prisma.productZone.createMany({
    data: zoneIds.map(zoneId => ({ productId, zoneId }))
  })
}

export async function updateProductZone(productId: string, zoneId: string, data: any) {
  return prisma.productZone.update({
    where: { productId_zoneId: { productId, zoneId } },
    data
  })
}
