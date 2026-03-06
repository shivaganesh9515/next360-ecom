import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/database'

export function auditLog(action: string, targetType: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    // We attach an event to 'finish' so the log is written after response is sent
    res.on('finish', async () => {
      // Only log successful (or at least non-500) operations if desired, or all.
      // Let's log if < 400
      if (res.statusCode < 400) {
        try {
          await prisma.auditLog.create({
            data: {
              adminId: req.user?.id ?? 'unknown',
              action,
              targetType,
              targetId: (req.params.id as string) ?? 'N/A',
              metadata: {
                method: req.method,
                path: req.path,
                ip: req.ip,
              },
            },
          })
        } catch {
          // Fail silently on audit log failure so we don't crash the server
          // In production, maybe log to winston
        }
      }
    })
    
    next()
  }
}
