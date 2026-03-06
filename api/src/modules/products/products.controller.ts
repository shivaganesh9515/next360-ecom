import { Request, Response, NextFunction } from 'express'
import * as productsService from './products.service'
import { successResponse, paginatedResponse } from '../../shared/utils/response'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const filters = req.query as any
    const { products, total } = await productsService.getProducts(filters)
    paginatedResponse(res, products, total, filters.page, filters.limit)
  } catch (error) {
    next(error)
  }
}

export async function getFeatured(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productsService.getFeatured()
    successResponse(res, products)
  } catch (error) {
    next(error)
  }
}

export async function getSeasonal(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productsService.getSeasonal()
    successResponse(res, products)
  } catch (error) {
    next(error)
  }
}

export async function getTrending(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productsService.getTrending()
    successResponse(res, products)
  } catch (error) {
    next(error)
  }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productsService.getProductBySlug(req.params.slug as string)
    successResponse(res, product)
  } catch (error) {
    next(error)
  }
}

export async function getRelated(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productsService.getRelated(req.params.id as string)
    successResponse(res, products)
  } catch (error) {
    next(error)
  }
}

export async function getFrequentlyBoughtTogether(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productsService.getFrequentlyBoughtTogether(req.params.id as string)
    successResponse(res, products)
  } catch (error) {
    next(error)
  }
}
