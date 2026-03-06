import jwt from 'jsonwebtoken'
import { env } from '../../config/env'
import { Response } from 'express'

export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  })
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  })
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, env.JWT_SECRET)
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, env.JWT_REFRESH_SECRET)
}

export function setRefreshCookie(res: Response, token: string) {
  res.cookie('next360_refresh', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

export function clearRefreshCookie(res: Response) {
  res.clearCookie('next360_refresh')
}
