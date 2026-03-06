import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../shared/utils/token'
import { AppError } from '../shared/errors/AppError'
import { redis } from '../config/redis'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.next360_access) {
      token = req.cookies.next360_access
    }

    if (!token) {
      return next(AppError.unauthorized('No token provided'))
    }

    const decoded = verifyAccessToken(token)
    
    // Check blacklist (logout)
    const isBlacklisted = await redis.get(`blacklist:${token}`)
    if (isBlacklisted) {
      return next(AppError.unauthorized('Token revoked'))
    }

    req.user = decoded
    next()
  } catch (error) {
    return next(AppError.unauthorized('Invalid or expired token'))
  }
}

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.next360_access) {
      token = req.cookies.next360_access
    }

    if (token) {
      const decoded = verifyAccessToken(token)
      const isBlacklisted = await redis.get(`blacklist:${token}`)
      if (!isBlacklisted) {
        req.user = decoded
      }
    }
  } catch (error) {
    // Ignore error
  }
  
  next()
}

export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(AppError.unauthorized('Authentication required'))
    }
    if (req.user.role !== role) {
      return next(AppError.forbidden(`Required role: ${role}`))
    }
    next()
  }
}
