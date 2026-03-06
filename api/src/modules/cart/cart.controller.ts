import { Request, Response, NextFunction } from 'express'
import * as cartService from './cart.service'
import { successResponse } from '../../shared/utils/response'

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await cartService.getCart(req.user.id)
    successResponse(res, cart)
  } catch (error) {
    next(error)
  }
}

export async function addItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { productId, quantity, selectedWeight } = req.body
    const cart = await cartService.addItem(req.user.id, productId, quantity, selectedWeight)
    successResponse(res, cart)
  } catch (error) {
    next(error)
  }
}

export async function updateQty(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await cartService.updateQty(req.user.id, req.params.id as string, req.body.quantity)
    successResponse(res, cart)
  } catch (error) {
    next(error)
  }
}

export async function removeItem(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await cartService.removeItem(req.user.id, req.params.id as string)
    successResponse(res, cart)
  } catch (error) {
    next(error)
  }
}

export async function applyCoupon(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await cartService.applyCoupon(req.user.id, req.body.code)
    successResponse(res, cart, 'Coupon applied successfully')
  } catch (error) {
    next(error)
  }
}

export async function removeCoupon(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await cartService.removeCoupon(req.user.id)
    successResponse(res, cart, 'Coupon removed')
  } catch (error) {
    next(error)
  }
}
