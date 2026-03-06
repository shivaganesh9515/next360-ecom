import { Router } from 'express'
import * as productsController from './products.controller'
import { validate } from '../../middleware/validate'
import { z } from 'zod'

const router = Router()

const productQuerySchema = z.object({
  category: z.string().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  rating: z.string().transform(Number).optional(),
  search: z.string().optional(),
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('12'),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'rating']).default('newest'),
})

router.get('/', validate(productQuerySchema, 'query'), productsController.getProducts)
router.get('/featured', productsController.getFeatured)
router.get('/seasonal', productsController.getSeasonal)
router.get('/trending', productsController.getTrending)
router.get('/:slug', productsController.getProductBySlug)
router.get('/:id/related', productsController.getRelated)
router.get('/:id/frequently-bought-together', productsController.getFrequentlyBoughtTogether)

export default router
