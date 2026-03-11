import { Role } from '@next360/types'

export const getRedirectUrl = (role: Role): string => {
  const isDev = process.env.NODE_ENV === 'development'

  if (role === 'ADMIN') {
    return '/dashboard'
  }

  if (role === 'VENDOR') {
    return isDev ? 'http://localhost:3002/dashboard' : 'https://vendor.next360.in/dashboard'
  }

  // Default for others (like CUSTOMER logging in on Admin portal accidentally)
  return isDev ? 'http://localhost:3000/account' : 'https://next360.in/account'
}

export const handleAuthRedirect = (role: Role, routerPush: (url: string) => void) => {
  const url = getRedirectUrl(role)
  
  if (url.startsWith('http')) {
    window.location.href = url
  } else {
    routerPush(url)
  }
}
