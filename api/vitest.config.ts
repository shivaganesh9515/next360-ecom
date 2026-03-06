import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/__tests__/**/*.test.ts'],
    env: {
      DATABASE_URL: 'postgresql://dummy',
      REDIS_URL: 'redis://dummy',
      JWT_SECRET: 'dummy',
      JWT_REFRESH_SECRET: 'dummy',
      GCS_BUCKET_NAME: 'dummy',
      GCS_PROJECT_ID: 'dummy',
      ALGOLIA_APP_ID: 'dummy',
      ALGOLIA_API_KEY: 'dummy',
      RAZORPAY_KEY_ID: 'dummy',
      RAZORPAY_KEY_SECRET: 'dummy',
      RAZORPAY_WEBHOOK_SECRET: 'dummy',
      RESEND_API_KEY: 'dummy',
      MSG91_API_KEY: 'dummy',
      MSG91_SENDER_ID: 'dummy',
      NODE_ENV: 'test',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
