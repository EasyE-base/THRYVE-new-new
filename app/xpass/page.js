'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Check, Star, MapPin, Clock, Users, Zap, Award, Infinity, 
  TrendingUp, Shield, ChevronRight, ChevronDown, Play,
  Network, Heart, Calendar, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'

export default function XPassPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState('unlimited')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const handleJoinPass = () => {
    if (!user) {
      toast.info("Sign up to join X Pass!")
      return
    }
    toast.success("Welcome to X Pass! Let's get started 🎉")
  }

  const benefits = [
    {
      icon: Network,
      title: "One Network Pass",
      description: "Access 500+ studios with a single membership"
    },
    {
      icon: Award,
      title: "Earn Loyalty",
      description: "Build rewards and unlock exclusive perks"
    },
    {
      icon: Star,
      title: "Top-Rated Studios",
      description: "Only premium, highly-rated fitness partners"
    },
    {
      icon: Calendar,
      title: "Flex Scheduling",
      description: "Book, reschedule, or cancel with ease"
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Browse Across Studios",
      description: "Explore classes from hundreds of premium studios in your area"
    },
    {
      number: "02", 
      title: "Book with X Pass Credits",
      description: "Use your monthly credits to reserve spots in any participating studio"
    },
    {
      number: "03",
      title: "Attend Anywhere",
      description: "Show up and enjoy world-class fitness experiences across the network"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sage-Green Accent Stripe */}
      <div className="h-1 bg-gradient-to-r from-emerald-600 to-teal-600"></div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Thryve</h1>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/explore" className="text-gray-600 hover:text-emerald-600 transition-colors">Explore</Link>
              <Link href="/studios" className="text-gray-600 hover:text-emerald-600 transition-colors">Studios</Link>
              <Link href="/xpass" className="text-emerald-600 font-medium">X Pass</Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-600 hover:text-emerald-600">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-gray-50 to-emerald-50 py-20 overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              FIND YOUR X FACTOR<br />
              <span className="text-emerald-600">WITH THRYVE X PASS</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock tens of thousands of workouts nationwide<br />
              with one flexible membership.
            </p>
            <Button 
              onClick={handleJoinPass}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View Plans
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                    <benefit.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl text-emerald-100 mb-8">Join thousands of members already using X Pass</p>
          <Button 
            onClick={handleJoinPass}
            className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Join X Pass Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Thryve</h3>
              <p className="text-gray-400">Discover your next fitness obsession.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/explore" className="hover:text-emerald-400 transition-colors">Explore Classes</Link></li>
                <li><Link href="/studios" className="hover:text-emerald-400 transition-colors">Partner Studios</Link></li>
                <li><Link href="/xpass" className="hover:text-emerald-400 transition-colors">X Pass</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/community" className="hover:text-emerald-400 transition-colors">Community</Link></li>
                <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
                <li><Link href="/events" className="hover:text-emerald-400 transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Thryve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
