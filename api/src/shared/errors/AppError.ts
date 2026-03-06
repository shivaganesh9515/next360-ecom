export class AppError extends Error {
  statusCode: number
  code: string
  isOperational: boolean
  
  constructor(message: string, statusCode: number, code: string) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true
  }

  static notFound(message = 'Resource not found') {
    return new AppError(message, 404, 'NOT_FOUND')
  }

  static unauthorized(message = 'Unauthorized') {
    return new AppError(message, 401, 'UNAUTHORIZED')
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(message, 403, 'FORBIDDEN')
  }

  static badRequest(message = 'Bad Request') {
    return new AppError(message, 400, 'BAD_REQUEST')
  }

  static conflict(message = 'Conflict') {
    return new AppError(message, 409, 'CONFLICT')
  }

  static internal(message = 'Internal Server Error') {
    return new AppError(message, 500, 'INTERNAL_ERROR')
  }
}
