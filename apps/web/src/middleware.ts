import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next360-auth-token')?.value
  const { pathname } = request.nextUrl

  // Protected routes - redirect to login if no token
  const isProtectedPath = 
    pathname.startsWith('/account') || 
    pathname === '/checkout' || 
    pathname === '/subscribe/checkout'

  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Auth routes - redirect to home if already logged in
  const isAuthPath = pathname === '/login' || pathname === '/register'
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/account/:path*',
    '/checkout',
    '/subscribe/checkout',
    '/login',
    '/register',
  ],
}
