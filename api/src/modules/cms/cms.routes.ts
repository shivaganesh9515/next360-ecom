import { Router } from 'express'
import * as cmsController from './cms.controller'
import { asyncHandler } from '../../middleware/async'
import { requireAdmin } from '../../middleware/requireRole'
import { authenticate } from '../../middleware/auth'

const router = Router()

// All routes require Admin
router.use(authenticate, requireAdmin)

// Locations
router.post('/states', asyncHandler(cmsController.upsertState))
router.post('/zones', asyncHandler(cmsController.upsertZone))
router.post('/zones/:id/pincodes/bulk', asyncHandler(cmsController.bulkImportPincodes))

// Storefront Content
router.post('/announcements', asyncHandler(cmsController.upsertAnnouncement))
router.delete('/announcements/:id', asyncHandler(cmsController.deleteAnnouncement))

router.post('/banners', asyncHandler(cmsController.upsertBanner))
router.put('/banners/reorder', asyncHandler(cmsController.reorderBanners))

router.put('/homepage-sections', asyncHandler(cmsController.updateHomepageSections))

// Product Assignments
router.post('/products/zones', asyncHandler(cmsController.assignProductToZones))

export default router
