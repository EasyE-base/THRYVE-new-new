'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Mock auth hook for development - replace with actual Firebase auth implementation
export function useAuth() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Mock authentication logic
    // In production, replace this with actual Firebase auth
    const mockUser = {
      uid: 'mock-user-id',
      email: 'user@example.com',
      name: 'Mock User'
    }
    
    // Simulate auth loading
    setTimeout(() => {
      setUser(mockUser)
      setRole('customer') // Mock role - can be 'merchant', 'instructor', 'customer'
      setLoading(false)
    }, 1000)
  }, [])

  const signOut = async () => {
    try {
      setUser(null)
      setRole(null)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      // Mock profile update
      setUser(prev => ({ ...prev, ...profileData }))
      return true
    } catch (error) {
      console.error('Error updating profile:', error)
      return false
    }
  }

  return {
    user,
    role,
    loading,
    signOut,
    updateProfile,
    isAuthenticated: !!user
  }
}
// Force deployment for auth fixes
