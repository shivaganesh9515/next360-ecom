import { Request, Response } from 'express'
import * as cmsService from './cms.service'
import { successResponse } from '../../shared/utils/response'

// --- Location ---
export async function upsertState(req: Request, res: Response) {
  const result = await cmsService.upsertState(req.body)
  return successResponse(res, result, 'State saved')
}

export async function upsertZone(req: Request, res: Response) {
  const result = await cmsService.upsertZone(req.body)
  return successResponse(res, result, 'Zone saved')
}

export async function bulkImportPincodes(req: Request, res: Response) {
  const id = req.params.id as string
  const { pincodes } = req.body
  const result = await cmsService.bulkImportPincodes(id, pincodes)
  return successResponse(res, result, 'Pincodes imported')
}

// --- Content ---
export async function upsertAnnouncement(req: Request, res: Response) {
  const { id } = req.body
  const result = id 
    ? await cmsService.updateAnnouncement(id, req.body)
    : await cmsService.createAnnouncement(req.body)
  return successResponse(res, result, 'Announcement saved')
}

export async function deleteAnnouncement(req: Request, res: Response) {
  const result = await cmsService.deleteAnnouncement(req.params.id as string)
  return successResponse(res, result, 'Announcement deleted')
}

export async function upsertBanner(req: Request, res: Response) {
  const result = await cmsService.upsertBanner(req.body)
  return successResponse(res, result, 'Banner saved')
}

export async function reorderBanners(req: Request, res: Response) {
  await cmsService.reorderBanners(req.body.ids)
  return successResponse(res, null, 'Banners reordered')
}

export async function updateHomepageSections(req: Request, res: Response) {
  const { zoneId, mode, sections } = req.body
  const result = await cmsService.updateHomepageSections(zoneId, mode, sections)
  return successResponse(res, result, 'Homepage sections updated')
}

// --- Products ---
export async function assignProductToZones(req: Request, res: Response) {
  const { productId, zoneIds } = req.body
  const result = await cmsService.assignProductToZones(productId, zoneIds)
  return successResponse(res, result, 'Product zones assigned')
}
