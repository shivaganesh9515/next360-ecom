import { Router } from 'express'
import * as ordersController from './orders.controller'
import { authenticate } from '../../middleware/auth'
import { validate } from '../../middleware/validate'
import { z } from 'zod'

const router = Router()
router.use(authenticate)

const createOrderSchema = z.object({
  addressId: z.string(),
  paymentMethod: z.enum(['UPI', 'CARD', 'NET_BANKING', 'COD']),
})

const verifyOrderSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})

router.post('/', validate(createOrderSchema), ordersController.createOrder)
router.post('/verify', validate(verifyOrderSchema), ordersController.verifyPayment)
router.get('/', ordersController.getMyOrders)
router.get('/:id', ordersController.getOrderById)
router.patch('/:id/cancel', ordersController.cancelOrder)

export default router
