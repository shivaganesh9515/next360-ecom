import { Request, Response } from 'express'
import * as locationService from './location.service'
import { successResponse } from '../../shared/utils/response'

export async function detectLocation(req: Request, res: Response) {
  const { lat, lng } = req.body
  const result = await locationService.detectLocation(Number(lat), Number(lng))
  return successResponse(res, result, 'Location detected successfully')
}

export async function checkPincode(req: Request, res: Response) {
  const { pincode } = req.body
  const result = await locationService.checkPincode(pincode)
  return successResponse(res, result, 'Pincode check completed')
}

export async function getStates(req: Request, res: Response) {
  const states = await locationService.getStates()
  return successResponse(res, states, 'States retrieved successfully')
}

export async function getDistricts(req: Request, res: Response) {
  const stateCode = req.params.stateCode as string
  const districts = await locationService.getDistricts(stateCode)
  return successResponse(res, districts, 'Districts retrieved successfully')
}

export async function getCities(req: Request, res: Response) {
  const districtId = req.params.districtId as string
  const cities = await locationService.getCities(districtId)
  return successResponse(res, cities, 'Cities retrieved successfully')
}

export async function addToWaitlist(req: Request, res: Response) {
  const result = await locationService.addToWaitlist(req.body)
  return successResponse(res, result, 'Added to waitlist successfully', 201)
}
