export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  success: false
  error: string
  code: string
  details?: Array<{ field: string; message: string }>
}
