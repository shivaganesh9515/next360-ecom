import { Request, Response, NextFunction } from 'express'
import { AppError } from '../shared/errors/AppError'

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError.unauthorized())
    }
    
    if (!roles.includes(req.user.role)) {
      return next(AppError.forbidden('Insufficient permissions'))
    }
    
    next()
  }
}

export const requireAdmin = requireRole('ADMIN')
export const requireVendor = requireRole('VENDOR', 'ADMIN')
export const requireCustomer = requireRole('CUSTOMER', 'VENDOR', 'ADMIN')
