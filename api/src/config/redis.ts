import Redis from 'ioredis'
import { env } from './env'
import winston from 'winston'

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
})

redis.on('error', (err) => {
  winston.error('Redis Client Error', err)
  // Graceful degradation, do not crash
})

redis.on('ready', () => {
  winston.info('✅ Redis Client Ready')
})
