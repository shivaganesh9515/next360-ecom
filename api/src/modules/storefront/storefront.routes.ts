import { Router } from 'express'
import * as storefrontController from './storefront.controller'
import { asyncHandler } from '../../middleware/async'

const router = Router()

router.get('/', asyncHandler(storefrontController.getStorefrontData))
router.get('/coupons', asyncHandler(storefrontController.getCoupons))
router.get('/rythu-batches', asyncHandler(storefrontController.getRythuBatches))

export default router
