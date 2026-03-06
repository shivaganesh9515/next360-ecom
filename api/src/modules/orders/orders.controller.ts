import { Request, Response, NextFunction } from 'express'
import * as ordersService from './orders.service'
import { successResponse } from '../../shared/utils/response'

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await ordersService.createOrder(req.user.id, req.body.addressId, req.body.paymentMethod)
    successResponse(res, order, 'Order created successfully')
  } catch (error) {
    next(error)
  }
}

export async function verifyPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await ordersService.verifyPayment(req.user.id, req.body)
    successResponse(res, result, 'Payment verified successfully')
  } catch (error) {
    next(error)
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await ordersService.getMyOrders(req.user.id)
    successResponse(res, orders)
  } catch (error) {
    next(error)
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await ordersService.getOrderById(req.user.id, req.params.id as string)
    successResponse(res, order)
  } catch (error) {
    next(error)
  }
}

export async function cancelOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await ordersService.cancelOrder(req.user.id, req.params.id as string)
    successResponse(res, order, 'Order cancelled successfully')
  } catch (error) {
    next(error)
  }
}
