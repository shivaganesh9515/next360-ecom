import rateLimit from 'express-rate-limit'

// Basic rate limiter without Redis (Redis store can be added as needed via rate-limit-redis)

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many attempts', code: 'RATE_LIMIT' },
})

export const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, error: 'Too many registration attempts', code: 'RATE_LIMIT' },
})

export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { success: false, error: 'Too many API requests', code: 'RATE_LIMIT' },
})

export const adminRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: { success: false, error: 'Too many Admin API requests', code: 'RATE_LIMIT' },
})
