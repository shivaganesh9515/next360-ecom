import { Router } from 'express'
import * as locationController from './location.controller'
import { asyncHandler } from '../../middleware/async'

const router = Router()

router.post('/detect', asyncHandler(locationController.detectLocation))
router.post('/check-pincode', asyncHandler(locationController.checkPincode))

router.get('/states', asyncHandler(locationController.getStates))
router.get('/states/:stateCode/districts', asyncHandler(locationController.getDistricts))
router.get('/districts/:districtId/cities', asyncHandler(locationController.getCities))

router.post('/waitlist', asyncHandler(locationController.addToWaitlist))

export default router
