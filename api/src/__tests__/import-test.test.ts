import { vi } from 'vitest'

vi.mock('algoliasearch', () => ({
  default: vi.fn(() => ({})),
  algoliasearch: vi.fn(() => ({}))
}))

import { describe, it, expect } from 'vitest'
import { prisma } from '../config/database'
import { redis } from '../config/redis'
import { authenticate } from '../middleware/auth'
import { algoliaClient, productsIndex } from '../config/algolia'
import passport from 'passport'
import { app } from '../app'
import request from 'supertest'

describe('Import isolation test', () => {
  it('should import config and middleware', () => {
    expect(prisma).toBeDefined()
    expect(redis).toBeDefined()
    expect(authenticate).toBeDefined()
    expect(algoliaClient).toBeDefined()
    expect(productsIndex).toBeDefined()
    expect(passport).toBeDefined()
    expect(app).toBeDefined()
  })
})
