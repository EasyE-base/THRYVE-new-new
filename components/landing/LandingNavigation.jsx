'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, Bell } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'

// ✅ EXTRACTED: Navigation component from main landing page
export default function LandingNavigation({ onSignInClick }) {
  const { user } = useAuth()

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism backdrop-blur-md border-b border-white/20 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Thryve
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-white/80 hover:text-white transition-colors font-medium smooth-transition">
              Explore
            </Link>
            <Link href="/xpass-purchase" className="text-white/80 hover:text-white transition-colors font-medium smooth-transition">
              X Pass
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors font-medium smooth-transition">
              Pricing
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium smooth-transition">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 p-2 rounded-full"
                  title="Messages"
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 p-2 rounded-full relative"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Link href="/dashboard">
                  <Button className="btn-modern bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full border border-white/30">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 btn-modern"
                  onClick={onSignInClick}
                >
                  Sign In
                </Button>
                <Link href="/signup">
                  <Button className="btn-modern bg-white text-black hover:bg-white/90 px-6 py-2 rounded-full font-semibold">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}