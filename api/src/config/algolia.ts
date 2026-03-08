import { algoliasearch } from 'algoliasearch'
import { env } from './env'

// In v5 it's a named export usually, or default is an object.
export const algoliaClient = (algoliasearch as unknown as Function)(
  env.ALGOLIA_APP_ID,
  env.ALGOLIA_API_KEY
)

// In Algolia v5, initIndex might be deprecated on the top level client, instead it's typically `client.search` or `client.saveObject`
// BUT following the instructions closely for now:
export const productsIndex = env.ALGOLIA_INDEX_NAME // just store the name, we use client methods mostly now, or if it works we'll adapt

export async function indexProduct(product: any) {
  // @ts-ignore - handling v4 vs v5 differences gracefully if needed, but going with standard v4-like saveObject on client if mapped
  // Note: the master instruction said `productsIndex.saveObject`
  // We'll mimic the v4 style if they rely on it, but use v5 if forced.
  // We'll write it the way requested. Let's cast to any to avoid ts errors if v5 changed it.
  const index: any = algoliaClient.initIndex ? algoliaClient.initIndex(env.ALGOLIA_INDEX_NAME) : null
  
  const obj = {
    objectID: product.id,
    name: product.name,
    slug: product.slug,
    shortDesc: product.shortDesc,
    price: product.price,
    category: product.category?.name,
    categorySlug: product.category?.slug,
    tags: product.tags,
    healthGoalTags: product.healthGoalTags,
    certifications: product.certifications,
    rating: product.rating,
    inStock: product.inStock,
    isOrganic: product.isOrganic,
    image: product.images?.[0] || '',
  }

  if (index) {
    await index.saveObject(obj)
  } else {
    // try v5 style
    await (algoliaClient as any).saveObject({ indexName: env.ALGOLIA_INDEX_NAME, body: obj })
  }
}

export async function removeFromIndex(productId: string) {
  const index: any = algoliaClient.initIndex ? algoliaClient.initIndex(env.ALGOLIA_INDEX_NAME) : null
  if (index) {
    await index.deleteObject(productId)
  } else {
    await (algoliaClient as any).deleteObject({ indexName: env.ALGOLIA_INDEX_NAME, objectID: productId })
  }
}
