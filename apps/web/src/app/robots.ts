import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://next360-ecom.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/checkout/', '/admin/', '/vendor/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
