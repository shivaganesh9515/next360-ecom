import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import winston from 'winston'
import { env } from './config/env'
import { apiRateLimit } from './middleware/rateLimit'
import { errorHandler } from './middleware/errorHandler'
import { authenticate } from './middleware/auth'
import { requireAdmin, requireVendor, requireCustomer } from './middleware/requireRole'

import authRouter from './modules/auth/auth.routes'
import productsRouter from './modules/products/products.routes'
import cartRouter from './modules/cart/cart.routes'
import ordersRouter from './modules/orders/orders.routes'
import searchRouter from './modules/search/search.routes'
import accountRouter from './modules/account/account.routes'
import vendorRouter from './modules/vendor/vendor.routes'
import adminRouter from './modules/admin/admin.routes'
import webhooksRouter from './modules/webhooks/webhooks.routes'

const app = express()

// Logger config
export const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
})

// Basic Middleware
app.use(helmet())
app.use(cors({
  origin: [env.FRONTEND_URL, env.ADMIN_URL, env.VENDOR_URL],
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE'],
}))
app.use(compression())

// Webhooks need raw body
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhooksRouter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Rate limiting
app.use(apiRateLimit)

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// Routes
app.use('/api/auth',          authRouter)
app.use('/api/products',      productsRouter)
app.use('/api/cart',          cartRouter) // Auth is inside cart.routes
app.use('/api/orders',        ordersRouter) // Auth is inside orders.routes
app.use('/api/search',        searchRouter)
app.use('/api/account',       authenticate, accountRouter)
app.use('/api/vendor',        authenticate, requireVendor, vendorRouter)
app.use('/api/admin',         authenticate, requireAdmin, adminRouter)

// 404
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// Global Error Handler
app.use(errorHandler)

export { app }
