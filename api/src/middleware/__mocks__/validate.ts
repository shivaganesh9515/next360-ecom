import { vi } from 'vitest'

export const validate = vi.fn((schema) => (req, res, next) => next())
