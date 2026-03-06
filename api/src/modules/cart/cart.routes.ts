import { Router } from 'express'
import * as cartController from './cart.controller'
import { validate } from '../../middleware/validate'
import { authenticate } from '../../middleware/auth'
import { z } from 'zod'

const router = Router()
router.use(authenticate)

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  selectedWeight: z.string()
})

const couponSchema = z.object({
  code: z.string().min(1)
})

router.get('/', cartController.getCart)
router.post('/items', validate(itemSchema), cartController.addItem)
router.put('/items/:id', validate(z.object({ quantity: z.number().int().nonnegative() })), cartController.updateQty)
router.delete('/items/:id', cartController.removeItem)
router.post('/coupon', validate(couponSchema), cartController.applyCoupon)
router.delete('/coupon', cartController.removeCoupon)

export default router
