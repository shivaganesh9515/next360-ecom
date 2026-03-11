'use client'

import { ReactNode, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocationStore } from '@/store/locationStore'
import { useModeStore } from '@/store/modeStore'
import { storefrontService } from '@/services/storefrontService'
import { PLATFORM_MODE_META } from '@next360/types/location'
import { Skeleton } from '@next360/ui/Skeleton'
import GocartHero from './GocartHero'
import MarqueeTicker from './MarqueeTicker'
import OfferCarousel from './OfferCarousel'
import FlashSaleBanner from './FlashSaleBanner'
import CategoryStrip from './CategoryStrip'
import FeaturedProducts from './FeaturedProducts'
import HyperlocalStrip from './HyperlocalStrip'
import LiveBatchStrip from './LiveBatchStrip'
import WhyNext360 from './WhyNext360'
import SubscriptionBanner from './SubscriptionBanner'
import Testimonials from './Testimonials'
import ImpactNumbers from './ImpactNumbers'
import NewsletterBanner from './NewsletterBanner'
import PromoPopup from './PromoPopup'
import ModeSelectorStrip from './ModeSelectorStrip'

export default function HomePageClient() {
  const { zoneId, zoneName, hyperlocalActive } = useLocationStore()
  const { activeMode } = useModeStore()
  const effectiveZoneId = zoneId || 'zone-hyd'
  const mode = activeMode || 'ORGANIC'

  const { data: storefront, isLoading } = useQuery({
    queryKey: ['storefront', effectiveZoneId, mode],
    queryFn: () => storefrontService.getStorefrontData(effectiveZoneId, mode),
  })

  const { data: rythuBatches = [] } = useQuery({
    queryKey: ['storefront', 'rythu-batches', effectiveZoneId],
    queryFn: () => storefrontService.getRythuBatches(effectiveZoneId),
    enabled: mode === 'RYTHU_BAZAR',
  })

  const sections = useMemo(() => {
    return [...(storefront?.sections ?? [])].sort((a, b) => a.displayOrder - b.displayOrder)
  }, [storefront?.sections])

  const sectionMap: Record<string, ReactNode> = {
    hero: <GocartHero banners={storefront?.banners ?? []} />,
    marquee: <MarqueeTicker items={storefront?.marqueeItems ?? []} />,
    offers: <OfferCarousel />,
    modes: <ModeSelectorStrip />,
    category_strip: <CategoryStrip />,
    featured_products: <FeaturedProducts />,
    flash_sale: <FlashSaleBanner sale={storefront?.flashSale ?? null} />,
    hyperlocal: <HyperlocalStrip />,
    rythu_batch: <LiveBatchStrip batches={rythuBatches} />,
    why_us: <WhyNext360 />,
    subscription_banner: <SubscriptionBanner />,
    testimonials: <Testimonials items={storefront?.testimonials} />,
    impact_numbers: <ImpactNumbers />,
    newsletter: <NewsletterBanner />,
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface">
        <Skeleton className="w-full h-[600px] mb-4" />
        <div className="max-w-7xl mx-auto px-4 space-y-12 py-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
           </div>
           <Skeleton className="w-full h-80 rounded-[3rem]" />
        </div>
      </main>
    )
  }

  return (
    <>
      <PromoPopup popup={storefront?.popup ?? null} />
      <main className="min-h-screen pt-20 bg-white">
        {sections.length > 0 ? (
          sections.map((section) => (
            <div key={`${section.sectionKey}-${section.displayOrder}`}>
              {sectionMap[section.sectionKey] ?? null}
            </div>
          ))
        ) : (
          <div className="flex flex-col">
            {sectionMap.hero}
            {sectionMap.modes}
            {sectionMap.marquee}
            {sectionMap.offers}
            {sectionMap.category_strip}
            {sectionMap.flash_sale}
            {sectionMap.featured_products}
            {hyperlocalActive && sectionMap.hyperlocal}
            {mode === 'RYTHU_BAZAR' && sectionMap.rythu_batch}
            {sectionMap.why_us}
            {sectionMap.subscription_banner}
            {sectionMap.testimonials}
            {sectionMap.impact_numbers}
            {sectionMap.newsletter}
          </div>
        )}
      </main>
    </>
  )
}
