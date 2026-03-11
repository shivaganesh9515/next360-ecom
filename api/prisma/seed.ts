import { PrismaClient, Role, VendorStatus, ApprovalStatus, ZoneType, PlatformMode, DeliveryType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Purging existing data...')
  
  // High-level purge (Order matters for foreign keys)
  await prisma.rythuBatch.deleteMany()
  await prisma.productZone.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.wishlist.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.vendorServiceArea.deleteMany()
  await prisma.vendorProfile.deleteMany()
  await prisma.zonePincode.deleteMany()
  await prisma.zoneModeConfig.deleteMany()
  await prisma.zone.deleteMany()
  await prisma.city.deleteMany()
  await prisma.district.deleteMany()
  await prisma.state.deleteMany()
  await prisma.user.deleteMany()

  console.log('🌱 Starting high-fidelity database seeding...')

  const passwordHash = await bcrypt.hash('password123', 12)

  // 1. Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@next360.com',
      name: 'Registry Admin',
      passwordHash,
      role: Role.ADMIN,
      isVerified: true,
    },
  })
  console.log('✅ Admin initialized')

  // 2. Location Hierarchy (Telangana)
  const ts = await prisma.state.create({
    data: { name: 'Telangana', code: 'TS', isActive: true, displayOrder: 1 }
  })

  const districts = ['Warangal', 'Nizamabad', 'Medak', 'Adilabad', 'Khammam', 'Bhadradri', 'Sangareddy', 'Nalgonda']
  const districtMap: Record<string, any> = {}
  const cityMap: Record<string, any> = {}

  for (const d of districts) {
    const dist = await prisma.district.create({
      data: { id: `dist-${d.toLowerCase()}`, name: d, stateId: ts.id, isActive: true }
    })
    districtMap[d] = dist

    const city = await prisma.city.create({
      data: { 
        id: `city-${d.toLowerCase()}`, 
        name: d, 
        districtId: dist.id, 
        isActive: true, 
        hyperlocalActive: true,
        deliveryPromise: 'Delivers in 60 min'
      }
    })
    cityMap[d] = city
  }

  // Create standard Zone for Telangana
  const tsZone = await prisma.zone.create({
    data: {
      id: 'zone-ts',
      name: 'Telangana Core',
      type: ZoneType.STATE,
      stateId: ts.id,
      isActive: true,
    }
  })

  await prisma.zoneModeConfig.createMany({
    data: [
      { zoneId: tsZone.id, mode: PlatformMode.ORGANIC, isDefault: true, label: 'Organic Registry' },
      { zoneId: tsZone.id, mode: PlatformMode.RYTHU_BAZAR, isEnabled: true, label: 'Live Sequences' }
    ]
  })

  // 3. Categories
  const categoryData = [
    { name: 'Grains', slug: 'grains', icon: '🌾' },
    { name: 'Oils', slug: 'oils', icon: '🥥' },
    { name: 'Spices', slug: 'spices', icon: '🌿' },
    { name: 'Pulses', slug: 'pulses', icon: '🫘' },
    { name: 'Superfoods', slug: 'superfoods', icon: '🌱' },
    { name: 'Dairy', slug: 'dairy', icon: '🧈' },
    { name: 'Sweeteners', slug: 'sweeteners', icon: '🍯' },
  ]
  const categories: Record<string, any> = {}
  for (const c of categoryData) {
    categories[c.name] = await prisma.category.create({ data: c })
  }
  console.log('✅ Categories initialized')

  // 4. Vendors & Products
  const referenceProducts = [
    { name: "Organic Basmati Rice", farmer: "Ravi Kumar", price: 180, originalPrice: 240, weight: "1 kg", category: "Grains", certified: "NPOP", rating: 4.8, reviews: 124, badge: "Bestseller", img: "🌾", farm: "Ravi Organic Farm", harvest: "Oct 2024", location: "Warangal" },
    { name: "Cold-Press Coconut Oil", farmer: "Priya Farms", price: 320, originalPrice: 420, weight: "500 ml", category: "Oils", certified: "NPOP", rating: 4.9, reviews: 89, badge: "Premium", img: "🥥", farm: "Priya Organic Farms", harvest: "Nov 2024", location: "Nizamabad" },
    { name: "Turmeric Powder", farmer: "Arun Organics", price: 95, originalPrice: 130, weight: "200 g", category: "Spices", certified: "NPOP", rating: 4.7, reviews: 201, badge: "Pure", img: "🌿", farm: "Arun Organics", harvest: "Sep 2024", location: "Medak" },
    { name: "Red Lentils (Masoor Dal)", farmer: "Sunita Farms", price: 145, originalPrice: 190, weight: "1 kg", category: "Pulses", certified: "NPOP", rating: 4.6, reviews: 156, badge: "Limited", img: "🫘", farm: "Sunita Organic Farms", harvest: "Oct 2024", location: "Adilabad" },
    { name: "Moringa Leaf Powder", farmer: "GreenRoots", price: 220, originalPrice: 300, weight: "100 g", category: "Superfoods", certified: "NPOP", rating: 4.9, reviews: 78, badge: "Superfood", img: "🌱", farm: "GreenRoots Farm", harvest: "Nov 2024", location: "Khammam" },
    { name: "Millets Mix (5-grain)", farmer: "Tribal Grains", price: 160, originalPrice: 210, weight: "500 g", category: "Grains", certified: "NPOP", rating: 4.8, reviews: 93, badge: "Tribal", img: "🌾", farm: "Tribal Heritage Farm", harvest: "Sep 2024", location: "Bhadradri" },
    { name: "A2 Cow Ghee", farmer: "Gir Farms", price: 680, originalPrice: 850, weight: "500 ml", category: "Dairy", certified: "NPOP", rating: 5.0, reviews: 312, badge: "A2 Premium", img: "🧈", farm: "Gir Organic Farms", harvest: "Nov 2024", location: "Sangareddy" },
    { name: "Raw Wildflower Honey", farmer: "BeeCraft", price: 390, originalPrice: 520, weight: "300 g", category: "Sweeteners", certified: "NPOP", rating: 4.7, reviews: 67, badge: "Pure", img: "🍯", farm: "BeeCraft Organics", harvest: "Oct 2024", location: "Nalgonda" },
  ]

  for (const p of referenceProducts) {
    // Create User for Vendor
    const user = await prisma.user.create({
      data: {
        email: `${p.farmer.toLowerCase().replace(' ', '')}@premium.com`,
        name: p.farmer,
        passwordHash,
        role: Role.VENDOR,
        isVerified: true
      }
    })

    // Create Vendor Profile
    const vendor = await prisma.vendorProfile.create({
      data: {
        userId: user.id,
        storeName: p.farm,
        status: VendorStatus.ACTIVE,
        commissionRate: 10.0,
      }
    })

    // Service area (hyperlocal for their city)
    await prisma.vendorServiceArea.create({
      data: {
        vendorId: vendor.id,
        cityId: cityMap[p.location].id,
        type: DeliveryType.HYPERLOCAL,
        isActive: true
      }
    })

    // Create Product
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.name.toLowerCase().replace(/ /g, '-'),
        shortDesc: `Verified ${p.certified} ${p.name} directly from ${p.farm}, ${p.location}.`,
        description: `Premium organic ${p.name}. Certified by ${p.certified}. Harvested in ${p.harvest}.`,
        price: p.price * 100, // to paise
        defaultWeight: p.weight,
        isOrganic: true,
        certifications: [p.certified],
        tags: p.badge ? [p.badge] : [],
        images: [`https://source.unsplash.com/featured/?${p.name.split(' ').join(',')}`],
        rating: p.rating,
        numReviews: p.reviews,
        isFeatured: true,
        vendorId: vendor.id,
        categoryId: categories[p.category].id,
        approvalStatus: ApprovalStatus.ACTIVE,
        deliveryType: DeliveryType.NATIONAL,
      }
    })

    // Add to TS core zone
    await prisma.productZone.create({
      data: {
        productId: product.id,
        zoneId: tsZone.id,
        isAvailable: true
      }
    })

    // Create RythuBatch for the product
    await prisma.rythuBatch.create({
      data: {
        zoneId: tsZone.id,
        productId: product.id,
        farmerId: vendor.id,
        batchQty: 500,
        availableQty: 450,
        harvestDate: new Date('2024-10-15'),
        closesAt: new Date('2024-12-30'),
        pricePerUnit: p.price * 100,
        isActive: true
      }
    })
  }

  console.log('✅ Premium Products & Farmers initialized')
  console.log('✨ Registry configuration complete. System state: CLEAN.')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
