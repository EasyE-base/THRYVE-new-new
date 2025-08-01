import { NextResponse } from 'next/server'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/onboarding', 
  '/settings',
  '/my-bookings',
  '/instructor-payouts',
  '/studio-payouts',
  '/business-settings'
]

// Routes that require specific roles
const roleProtectedRoutes = {
  '/marketplace': ['merchant', 'instructor', 'studio-owner'],
  '/studio': ['merchant', 'studio-owner'],
  '/instructor-payouts': ['instructor'],
  '/studio-payouts': ['merchant', 'studio-owner']
}

// Routes that should redirect authenticated users
const guestOnlyRoutes = [
  '/login',
  '/signup'
]

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Get user data from cookies/headers
  const userCookie = request.cookies.get('user')
  const user = userCookie ? JSON.parse(userCookie.value) : null
  
  // Check if route requires authentication
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (requiresAuth && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check role-based access
  const roleRequirement = Object.entries(roleProtectedRoutes).find(([route]) => 
    pathname.startsWith(route)
  )
  
  if (roleRequirement && user) {
    const [, allowedRoles] = roleRequirement
    if (!allowedRoles.includes(user.role)) {
      if (user.role === 'customer' || user.role === 'client') {
        return NextResponse.redirect(new URL('/explore', request.url))
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect authenticated users away from guest-only routes
  if (guestOnlyRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
// Force middleware deployment
