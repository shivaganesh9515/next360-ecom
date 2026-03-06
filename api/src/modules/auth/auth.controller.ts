import { Request, Response, NextFunction } from 'express'
import * as authService from './auth.service'
import { successResponse } from '../../shared/utils/response'
import { setRefreshCookie, clearRefreshCookie } from '../../shared/utils/token'

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body)
    successResponse(res, result, 'Registration successful', 201)
  } catch (error) {
    next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body
    const { user, accessToken, refreshToken } = await authService.login(email, password)
    
    setRefreshCookie(res, refreshToken)
    
    successResponse(res, { user, accessToken }, 'Login successful')
  } catch (error) {
    next(error)
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.next360_access || ''
    await authService.logout(req.user.id, token)
    
    clearRefreshCookie(res)
    successResponse(res, null, 'Logged out successfully')
  } catch (error) {
    next(error)
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.next360_refresh
    if (!token) throw new Error('No refresh token')
      
    const result = await authService.refreshToken(token)
    successResponse(res, { accessToken: result.accessToken }, 'Token refreshed')
  } catch (error) {
    clearRefreshCookie(res)
    res.status(401).json({ success: false, error: 'Invalid or expired refresh token' })
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(req.user.id)
    successResponse(res, user, 'Profile fetched')
  } catch (error) {
    next(error)
  }
}
