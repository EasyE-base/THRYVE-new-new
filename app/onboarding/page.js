'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

function OnboardingRouterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, role, loading } = useAuth()
  
  const urlRole = searchParams.get('role')

  useEffect(() => {
    if (loading) return
    
    if (!user) {
      router.push('/signup')
      return
    }

    let targetRole = urlRole || role

    if (!targetRole) {
      router.push('/signup/role-selection')
      return
    }

    switch (targetRole) {
      case 'merchant':
      case 'studio-owner':
        router.push('/onboarding/merchant')
        break
      case 'instructor':
        router.push('/onboarding/instructor')
        break
      case 'customer':
      case 'client':
        router.push('/onboarding/customer')
        break
      default:
        router.push('/signup/role-selection')
        break
    }
  }, [user, role, urlRole, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your onboarding...</p>
      </div>
    </div>
  )
}

export default function OnboardingRouter() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <OnboardingRouterContent />
    </Suspense>
  )
}
