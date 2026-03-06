import { Response } from 'express'

export function successResponse(
  res: Response,
  data: any,
  message = 'Success',
  statusCode = 200,
  meta?: any
) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  })
}

export function paginatedResponse(
  res: Response,
  data: any,
  total: number,
  page: number,
  limit: number
) {
  successResponse(res, data, 'Success', 200, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
