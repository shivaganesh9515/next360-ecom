import { Request, Response } from 'express'
import * as storefrontService from './storefront.service'
import { successResponse } from '../../shared/utils/response'
import { PlatformMode } from '@prisma/client'

export async function getStorefrontData(req: Request, res: Response) {
  const { zoneId, mode } = req.query as { zoneId: string; mode: PlatformMode }
  const data = await storefrontService.getStorefrontData(zoneId, mode)
  return successResponse(res, data, 'Storefront data retrieved')
}

export async function getRythuBatches(req: Request, res: Response) {
  const { zoneId } = req.query as { zoneId: string }
  const batches = await storefrontService.getRythuBatches(zoneId)
  return successResponse(res, batches, 'Rythu batches retrieved')
}

export async function getCoupons(req: Request, res: Response) {
  const coupons = await storefrontService.getAvailableCoupons()
  return successResponse(res, coupons, 'Coupons retrieved')
}
