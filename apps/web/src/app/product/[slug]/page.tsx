import React from 'react'
import { notFound } from 'next/navigation'
import { productService } from '@/services/productService'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductTabs from '@/components/product/ProductTabs'
import RelatedProducts from '@/components/product/RelatedProducts'
import FrequentlyBoughtTogether from '@/components/product/FrequentlyBoughtTogether'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const revalidate = 3600 // revalidate every hour

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await productService.getBySlug(slug)
  
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} | Next360 Organic`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
    }
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await productService.getBySlug(slug)

  if (!product) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumbs */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link href={`/shop?category=${product.category?.slug}`} className="hover:text-primary transition-colors">
              {product.category?.name}
            </Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 mb-20">
          {/* Left: Gallery */}
          <div className="w-full">
            <ProductGallery 
              images={product.images} 
              name={product.name} 
              isOrganic={true} 
            />
          </div>

          {/* Right: Info */}
          <div className="w-full">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Bottom: Tabs & Related */}
        <div className="space-y-32">
          <ProductTabs product={product} />
          
          <FrequentlyBoughtTogether currentProduct={product} />

          <RelatedProducts 
            currentProductId={product.id} 
            category={product.category?.slug || 'fruits'} 
          />
        </div>
      </main>
    </div>
  )
}

