import React from 'react'

import dynamic from 'next/dynamic'

// Home Sections
import HeroBanner from '@/components/home/HeroBanner'
import TodaysHarvest from '@/components/home/TodaysHarvest'
import HomeInteractive from '@/components/home/HomeInteractive'
import WhyNext360 from '@/components/home/WhyNext360'
import SubscriptionBanner from '@/components/home/SubscriptionBanner'
import SeasonalSection from '@/components/home/SeasonalSection'

const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { ssr: false })
const ImpactNumbers = dynamic(() => import('@/components/home/ImpactNumbers'), { ssr: false })
const BlogTeaser = dynamic(() => import('@/components/home/BlogTeaser'), { ssr: false })
const NewsletterBanner = dynamic(() => import('@/components/home/NewsletterBanner'), { ssr: false })

export const metadata = {
  title: 'Next360 | Premium Organic Produce Direct from Farms',
  description: 'Shop certified organic vegetables, fruits, dairy, and grains for a healthier lifestyle. Farm-to-table excellence delivered to your door.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <TodaysHarvest />
      <HomeInteractive />
      <WhyNext360 />
      <SubscriptionBanner />
      <SeasonalSection />
      <Testimonials />
      <ImpactNumbers />
      <BlogTeaser />
      <NewsletterBanner />
    </main>
  )
}

