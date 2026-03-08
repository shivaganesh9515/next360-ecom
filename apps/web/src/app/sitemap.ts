import { MetadataRoute } from 'next'
import { productService } from '@/services/productService'
import { blogService } from '@/services/blogService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://next360-ecom.vercel.app'

  let producturls: any[] = []
  let blogUrls: any[] = []

  try {
    // Fetch products and blog posts
    const products = await productService.getAll({ limit: 100 })
    producturls = (products.data || []).map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error)
  }

  try {
    const blogPosts = await blogService.getBlogPosts()
    blogUrls = (blogPosts || []).map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error)
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...producturls,
    ...blogUrls,
  ]
}
