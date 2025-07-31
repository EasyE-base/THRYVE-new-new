'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Eye, EyeOff } from 'lucide-react'
import { signUp, signIn, getUserRole } from '@/lib/firebase-auth'
import { toast } from 'sonner'

// ✅ EXTRACTED: Sign In Modal component
export default function SignInModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add validation
      if (!email || !password) {
        toast.error('Please fill in all required fields')
        setLoading(false)
        return
      }

      if (isSignUp && !name) {
        toast.error('Please enter your full name')
        setLoading(false)
        return
      }

      if (isSignUp) {
        // Sign up logic
        console.log('Processing sign up for:', { name, email })
        
        const [firstName, ...lastNameParts] = name.split(' ')
        const lastName = lastNameParts.join(' ')
        
        const result = await signUp(email, password)
        
        if (result.success) {
          toast.success('Account created successfully! Please select your role.')
          onClose()
          
          // Reset modal state
          setIsSignUp(false)
          setEmail('')
          setPassword('')
          setName('')
          
          // Store user info temporarily for role selection
          if (typeof window !== 'undefined') {
            localStorage.setItem('pendingRoleSelection', JSON.stringify({
              uid: result.user.uid,
              email,
              name,
              timestamp: Date.now()
            }))
          }
          
          // Redirect to role selection
          setTimeout(() => {
            window.location.href = '/signup/role-selection'
          }, 500)
        } else {
          toast.error(result.error || 'Sign up failed. Please try again.')
        }
      } else {
        // Sign in logic
        console.log('Processing sign in for:', { email })
        
        const result = await signIn(email, password)
        
        if (result.success) {
          toast.success('Signed in successfully!')
          onClose()
          
          // Reset modal state
          setIsSignUp(false)
          setEmail('')
          setPassword('')
          setName('')
          
          // Wait a moment for auth state to update, then redirect based on role
          setTimeout(async () => {
            try {
              // Get user role to determine redirect
              const userData = await getUserRole(result.user.uid)
              const userRole = userData?.role
              
              if (userRole) {
                // Redirect to appropriate dashboard
                const dashboardRoutes = {
                  customer: '/dashboard/customer',
                  instructor: '/dashboard/instructor',
                  merchant: '/dashboard/merchant'
                }
                window.location.href = dashboardRoutes[userRole] || '/dashboard/customer'
              } else {
                // No role set, redirect to role selection
                window.location.href = '/signup/role-selection'
              }
            } catch (error) {
              console.error('Error getting user role:', error)
              // Default redirect to customer dashboard
              window.location.href = '/dashboard/customer'
            }
          }, 1000)
        } else {
          toast.error(result.error || 'Sign in failed. Please check your credentials.')
        }
      }
    } catch (error) {
      console.error('Authentication error:', error)
      toast.error('Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop"
      onTouchStart={(e) => {
        // Prevent backdrop from interfering with input focus
        if (e.target === e.currentTarget) {
          e.preventDefault()
        }
      }}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EADBC8]/20 overflow-hidden modal-content">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#EADBC8]/20 hover:bg-[#EADBC8]/40 rounded-full flex items-center justify-center transition-colors touch-manipulation"
        >
          <X className="h-4 w-4 text-[#7A7A7A]" />
        </button>

        {/* Header */}
        <div className="px-6 md:px-8 pt-8 md:pt-10 pb-6 text-center bg-gradient-to-b from-[#F5F5DC]/30 to-transparent">
          <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1E] mb-2">
            {isSignUp ? 'Join Thryve' : 'Welcome Back'}
          </h2>
          <p className="text-[#7A7A7A] text-sm md:text-base">
            {isSignUp 
              ? 'Create your account to start your fitness journey' 
              : 'Sign in to access your personalized fitness experience'
            }
          </p>
        </div>

        <div className="px-6 md:px-8 pb-8 md:pb-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1C1C1E] font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="border-[#EADBC8] focus:border-[#1E90FF] focus:ring-[#1E90FF] py-3 rounded-xl text-base touch-manipulation"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1C1C1E] font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-[#EADBC8] focus:border-[#1E90FF] focus:ring-[#1E90FF] py-3 rounded-xl text-base touch-manipulation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1C1C1E] font-semibold">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border-[#EADBC8] focus:border-[#1E90FF] focus:ring-[#1E90FF] py-3 rounded-xl text-base pr-12 touch-manipulation"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A7A7A] hover:text-[#1C1C1E] transition-colors touch-manipulation"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white py-3 rounded-xl font-semibold text-base touch-manipulation disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-[#7A7A7A]">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#1E90FF] hover:underline font-medium touch-manipulation"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-4 md:mt-6 flex items-center">
            <div className="flex-1 border-t border-[#EADBC8]"></div>
            <span className="px-4 text-sm text-[#7A7A7A]">or</span>
            <div className="flex-1 border-t border-[#EADBC8]"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-4 md:mt-6 space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#EADBC8] text-[#1C1C1E] hover:bg-[#EADBC8]/10 py-3 rounded-xl font-medium touch-manipulation"
            >
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#EADBC8] text-[#1C1C1E] hover:bg-[#EADBC8]/10 py-3 rounded-xl font-medium touch-manipulation"
            >
              Continue with Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}