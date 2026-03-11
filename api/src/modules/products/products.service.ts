import { prisma } from '../../config/database'
import { redis } from '../../config/redis'
import { AppError } from '../../shared/errors/AppError'

export async function getProducts(filters: any) {
  const {
    category,
    minPrice,
    maxPrice,
    rating,
    search,
    sort,
    page = 1,
    limit = 12,
    zoneId,
    mode,
    deliveryType,
    healthGoals,
  } = filters

  const cacheKey = `products:list:${JSON.stringify(filters)}`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const where: any = {
    inStock: true,
    approvalStatus: 'ACTIVE',
  }

  if (category) where.category = { slug: category }
  if (minPrice !== undefined) where.price = { ...where.price, gte: Number(minPrice) }
  if (maxPrice !== undefined) where.price = { ...where.price, lte: Number(maxPrice) }
  if (rating !== undefined) where.rating = { gte: Number(rating) }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { shortDesc: { contains: search, mode: 'insensitive' } },
    ]
  }
  if (deliveryType) where.deliveryType = deliveryType
  if (mode) where.platformModes = { has: mode }
  if (zoneId) {
    where.productZones = {
      some: {
        zoneId,
        isAvailable: true,
      },
    }
  }
  const parsedHealthGoals = Array.isArray(healthGoals)
    ? healthGoals
    : typeof healthGoals === 'string'
    ? [healthGoals]
    : []
  if (parsedHealthGoals.length > 0) {
    where.healthGoalTags = { hasSome: parsedHealthGoals }
  }

  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'price-asc') orderBy = { price: 'asc' }
  if (sort === 'price-desc') orderBy = { price: 'desc' }
  if (sort === 'rating') orderBy = { rating: 'desc' }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * limit,
      take: Number(limit),
    }),
    prisma.product.count({ where }),
  ])

  const result = { products, total }
  await redis.set(cacheKey, JSON.stringify(result), 'EX', 5 * 60) // 5 min TTL
  return result
}

export async function getFeatured() {
  const cacheKey = 'products:featured'
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const products = await prisma.product.findMany({
    where: { isFeatured: true, inStock: true, approvalStatus: 'ACTIVE' },
    include: { category: true },
    take: 8,
  })

  await redis.set(cacheKey, JSON.stringify(products), 'EX', 60 * 60)
  return products
}

export async function getSeasonal() {
  const month = new Date().getMonth() + 1
  const cacheKey = `products:seasonal:${month}`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const products = await prisma.product.findMany({
    where: { seasonalMonths: { has: month }, inStock: true, approvalStatus: 'ACTIVE' },
    include: { category: true },
  })

  await redis.set(cacheKey, JSON.stringify(products), 'EX', 24 * 60 * 60)
  return products
}

export async function getTrending() {
  const cacheKey = 'products:trending'
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  // Using raw SQL for analytical query grouping by order items over last 7 days
  const products = await prisma.$queryRaw`
    SELECT p.*, COUNT(oi.id) as salesRank
    FROM "Product" p
    JOIN "OrderItem" oi ON p.id = oi."productId"
    JOIN "Order" o ON oi."orderId" = o.id
    WHERE o."placedAt" > NOW() - INTERVAL '7 days'
      AND p."inStock" = true
      AND p."approvalStatus" = 'ACTIVE'
    GROUP BY p.id
    ORDER BY salesRank DESC
    LIMIT 10
  `

  await redis.set(cacheKey, JSON.stringify(products, (key, value) => 
    typeof value === 'bigint' ? value.toString() : value // Handle BigInt serialization
  ), 'EX', 60 * 60)
  return products
}

export async function getProductBySlug(slug: string) {
  const cacheKey = `products:slug:${slug}`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      reviews: { take: 5, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true } } } },
      supplier: true,
    }
  })

  if (!product) throw AppError.notFound('Product not found')

  await redis.set(cacheKey, JSON.stringify(product), 'EX', 30 * 60)
  return product
}

export async function getRelated(productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return []

  const related = await prisma.product.findMany({
    where: {
      id: { not: productId },
      inStock: true,
      approvalStatus: 'ACTIVE',
      OR: [
        { categoryId: product.categoryId },
        { healthGoalTags: { hasSome: product.healthGoalTags } }
      ]
    },
    take: 8,
    include: { category: true }
  })

  return related
}

export async function getFrequentlyBoughtTogether(productId: string) {
  // Simplified for now: just return related with a 6hr cache
  const cacheKey = `products:fbt:${productId}`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)

  const items = await getRelated(productId)
  
  await redis.set(cacheKey, JSON.stringify(items), 'EX', 6 * 60 * 60)
  return items
}
