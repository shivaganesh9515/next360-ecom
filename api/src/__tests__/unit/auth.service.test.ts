import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as authService from '../../modules/auth/auth.service'
import { prisma } from '../../config/database'
import { redis } from '../../config/redis'
import bcrypt from 'bcryptjs'
import * as tokens from '../../shared/utils/token'
import { AppError } from '../../shared/errors/AppError'

vi.mock('../../config/database', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    }
  }
}))

vi.mock('../../config/redis', () => ({
  redis: {
    set: vi.fn(),
    del: vi.fn(),
    get: vi.fn(),
  }
}))

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  }
}))

vi.mock('../../shared/utils/token', () => ({
  generateAccessToken: vi.fn(),
  generateRefreshToken: vi.fn(),
  verifyRefreshToken: vi.fn(),
}))

describe('Auth Service', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
    passwordHash: 'hashed-password',
    role: 'CUSTOMER',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register', () => {
    it('should create a user and return tokens', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as any)
      vi.mocked(prisma.user.create).mockResolvedValue(mockUser as any)
      vi.mocked(tokens.generateAccessToken).mockReturnValue('access-token')
      vi.mocked(tokens.generateRefreshToken).mockReturnValue('refresh-token')

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })

      expect(prisma.user.create).toHaveBeenCalled()
      expect(redis.set).toHaveBeenCalledWith(expect.stringContaining('refresh:'), 'refresh-token', 'EX', expect.any(Number))
      expect(result.accessToken).toBe('access-token')
      expect(result.user).not.toHaveProperty('passwordHash')
    })

    it('should throw CONFLICT if email exists', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)

      await expect(authService.register({ email: 'test@example.com' }))
        .rejects.toThrow('Email already in use')
    })
  })

  describe('login', () => {
    it('should return tokens on valid credentials', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as any)
      vi.mocked(tokens.generateAccessToken).mockReturnValue('access-token')
      vi.mocked(tokens.generateRefreshToken).mockReturnValue('refresh-token')

      const result = await authService.login('test@example.com', 'password123')

      expect(result.accessToken).toBe('access-token')
      expect(redis.set).toHaveBeenCalled()
    })

    it('should throw UNAUTHORIZED on invalid password', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any)
      vi.mocked(bcrypt.compare).mockResolvedValue(false as any)

      await expect(authService.login('test@example.com', 'wrong'))
        .rejects.toThrow('Invalid email or password')
    })

    it('should throw UNAUTHORIZED if user not found', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null)

      await expect(authService.login('unknown@example.com', 'password'))
        .rejects.toThrow('Invalid email or password')
    })
  })

  describe('logout', () => {
    it('should delete refresh token and blacklist access token', async () => {
      await authService.logout('user-123', 'access-token')

      expect(redis.del).toHaveBeenCalledWith('refresh:user-123')
      expect(redis.set).toHaveBeenCalledWith('blacklist:access-token', 'true', 'EX', 900)
    })
  })
})
