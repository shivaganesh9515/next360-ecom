import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config() // load from .env

const envSchema = z.object({
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  GCS_BUCKET_NAME: z.string(),
  GCS_PROJECT_ID: z.string(),
  ALGOLIA_APP_ID: z.string(),
  ALGOLIA_API_KEY: z.string(),
  ALGOLIA_INDEX_NAME: z.string().default('next360_products'),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),
  RAZORPAY_WEBHOOK_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
  MSG91_API_KEY: z.string(),
  MSG91_SENDER_ID: z.string(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  ADMIN_URL: z.string().default('http://localhost:3001'),
  VENDOR_URL: z.string().default('http://localhost:3002'),
  PORT: z.string().default('4000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

export type Env = z.infer<typeof envSchema>

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(parsed.error.format(), null, 4))
  process.exit(1)
}

export const env = parsed.data
