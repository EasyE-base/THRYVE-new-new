'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Heart,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ExplorePage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  const mockClasses = [
    {
      id: 1,
      name: "Power Vinyasa Flow",
      studio: "Zen Flow Studio",
      time: "7:00 AM",
      price: 28,
      spots: 5,
      type: "Yoga",
      rating: 4.9,
      location: "Downtown",
      image: "https://images.unsplash.com/photo-1593810451056-0acc1fad48c5",
      description: "An energizing flow class"
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setClasses(mockClasses)
      setLoading(false)
    }, 1000)
  }, [])

  const handleBookClass = (classData) => {
    if (!user) {
      toast.error('Please sign in to book classes')
      window.location.href = '/login?redirect=' + encodeURIComponent('/explore')
      return
    }
    toast.success('Booking class...')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading classes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <h1 className="text-3xl font-bold text-gray-900">Explore</h1>
              <p className="text-gray-600">Find your perfect fitness class</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={classItem.image} 
                  alt={classItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {classItem.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{classItem.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{classItem.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{classItem.studio}</p>
                <p className="text-gray-500 text-sm mb-4">{classItem.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{classItem.spots} spots left</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">${classItem.price}</div>
                  <Button 
                    onClick={() => handleBookClass(classItem)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
