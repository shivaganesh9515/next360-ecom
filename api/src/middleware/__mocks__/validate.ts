import { vi } from 'vitest'

export const validate = vi.fn((schema: any) => (req: any, res: any, next: any) => next())
