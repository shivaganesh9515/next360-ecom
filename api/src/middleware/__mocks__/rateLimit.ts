import { vi } from 'vitest'

const passthrough = vi.fn((req, res, next) => next())

export const authRateLimit = passthrough
export const registerRateLimit = passthrough
export const apiRateLimit = passthrough
export const adminRateLimit = passthrough
