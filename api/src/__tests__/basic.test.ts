import { describe, it, expect, vi } from 'vitest'

// Core mocks to prevent initialization errors
vi.mock('algoliasearch', () => {
  const mockClient = {
    initIndex: vi.fn(() => ({
      saveObject: vi.fn(),
      deleteObject: vi.fn(),
      search: vi.fn(),
    })),
    saveObject: vi.fn(),
    deleteObject: vi.fn(),
    search: vi.fn(),
  }
  
  // Create a function that returns the mock client
  const mockFn: any = vi.fn(() => mockClient)
  
  // Add common exports as properties on the function
  mockFn.default = mockFn
  mockFn.algoliasearch = mockFn
  
  return {
    default: mockFn,
    algoliasearch: mockFn
  }
})

vi.mock('../config/redis', () => ({
  redis: {
    on: vi.fn(),
    get: vi.fn().mockResolvedValue(null),
    set: vi.fn().mockResolvedValue('OK'),
    del: vi.fn().mockResolvedValue(1),
  }
}))

vi.mock('../config/database', () => ({
  prisma: {
    $on: vi.fn(),
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    user: { findUnique: vi.fn() }
  }
}))

// Mock rate limiters
vi.mock('../middleware/rateLimit', () => {
  const passthrough = (req: any, res: any, next: any) => next()
  return {
    apiRateLimit: passthrough,
    authRateLimit: passthrough,
    registerRateLimit: passthrough,
    adminRateLimit: passthrough,
  }
})

import request from 'supertest'
import { app } from '../app'

describe('Basic Health Check', () => {
  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})
