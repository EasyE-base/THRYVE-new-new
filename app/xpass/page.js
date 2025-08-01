'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  ArrowLeft, 
  Star, 
  MapPin, 
  Zap,
  Infinity,
  DollarSign,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function XPassPage() {
  const { user } = useAuth()

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly X Pass',
      price: 149,
      classes: 8,
      description: '8 classes per month at any partner studio',
      features: [
        'Access to 500+ partner studios',
        'Premium class booking',
        'Cancel anytime',
        'Mobile app access'
      ]
    },
    {
      id: 'unlimited',
      name: 'Unlimited X Pass',
      price: 199,
      classes: 'Unlimited',
      description: 'Unlimited classes at any partner studio',
      features: [
        'Unlimited classes per month',
        'Access to 500+ partner studios',
        'Priority booking',
        'Premium amenities'
      ],
      popular: true
    }
  ]

  const handleGetXPass = () => {
    if (!user) {
      toast.error('Please sign in to purchase X Pass')
      window.location.href = '/login?redirect=' + encodeURIComponent('/xpass')
      return
    }
    window.location.href = '/xpass-purchase'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thryve X Pass</h1>
              <p className="text-gray-600">One membership. Thousands of classes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Access 500+ Studios with One Pass
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                From yoga to HIIT, boxing to barre - explore every workout style 
                across the city with unlimited freedom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGetXPass}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                >
                  Get Your X Pass
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">500+ Partner Studios</p>
                  <p className="text-blue-100">Unlimited Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your X Pass
            </h2>
            <p className="text-xl text-gray-600">
              Flexible plans to fit every fitness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative hover:shadow-xl transition-shadow ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleGetXPass}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Get {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of members who've discovered the freedom of unlimited fitness.
          </p>
          <Button 
            onClick={handleGetXPass}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
          >
            Get Your X Pass Today
          </Button>
        </div>
      </div>
    </div>
  )
}
