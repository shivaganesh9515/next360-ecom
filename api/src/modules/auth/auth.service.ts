import bcrypt from 'bcryptjs'
import { prisma } from '../../config/database'
import { redis } from '../../config/redis'
import { AppError } from '../../shared/errors/AppError'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../shared/utils/token'
import crypto from 'crypto'

export async function register(data: any) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  })
  
  if (existingUser) {
    throw AppError.conflict('Email already in use')
  }
  
  const passwordHash = await bcrypt.hash(data.password, 12)
  
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash,
    }
  })
  
  // TODO: Send verification email via pubsub here
  
  const payload = { id: user.id, email: user.email, role: user.role }
  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)
  
  // Cache refresh token logic
  await redis.set(`refresh:${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60)
  
  const { passwordHash: _, ...userWithoutPassword } = user
  
  return { user: userWithoutPassword, accessToken, refreshToken }
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  
  if (!user || !user.passwordHash) {
    throw AppError.unauthorized('Invalid email or password')
  }
  
  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    throw AppError.unauthorized('Invalid email or password')
  }
  
  const payload = { id: user.id, email: user.email, role: user.role }
  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken(payload)
  
  await redis.set(`refresh:${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60)
  
  const { passwordHash: _, ...userWithoutPassword } = user
  
  return { user: userWithoutPassword, accessToken, refreshToken }
}

export async function logout(userId: string, token: string) {
  await redis.del(`refresh:${userId}`)
  // Optional: Blacklist the short-lived access token itself using TTL
  // We'll set a hardcoded 15m expiration for simplicity since we don't parse the exp here readily
  if (token) {
    await redis.set(`blacklist:${token}`, 'true', 'EX', 15 * 60)
  }
}

export async function refreshToken(oldRefreshToken: string) {
  const decoded = verifyRefreshToken(oldRefreshToken)
  
  const storedToken = await redis.get(`refresh:${decoded.id}`)
  if (storedToken !== oldRefreshToken) {
    throw AppError.unauthorized('Invalid refresh token')
  }
  
  const user = await prisma.user.findUnique({ where: { id: decoded.id } })
  if (!user) throw AppError.unauthorized('User not found')
    
  const payload = { id: user.id, email: user.email, role: user.role }
  const accessToken = generateAccessToken(payload)
  
  // We can choose to rotate the refresh token here, but keeping it unchanged for this scope unless needed
  
  return { accessToken }
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { vendorProfile: true }
  })
  
  if (!user) throw AppError.notFound('User not found')
    
  const { passwordHash: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
