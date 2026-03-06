import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../../middleware/validate'
import * as authController from './auth.controller'
import { authenticate } from '../../middleware/auth'
import { authRateLimit, registerRateLimit } from '../../middleware/rateLimit'

const router = Router()

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
})

router.post('/register', registerRateLimit, validate(registerSchema), authController.register)
router.post('/login', authRateLimit, validate(loginSchema), authController.login)
router.post('/logout', authenticate, authController.logout)
router.post('/refresh-token', authController.refreshToken)
router.get('/me', authenticate, authController.getMe)

// Placeholders for remaining endpoints:
// router.post('/forgot-password', authController.forgotPassword)
// router.post('/reset-password', authController.resetPassword)
// router.post('/verify-email', authController.verifyEmail)
// router.get('/google', ...)
// router.get('/google/callback', ...)

export default router
