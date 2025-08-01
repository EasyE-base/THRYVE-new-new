'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

// ✅ EXTRACTED: Hero section with video backgrounds
const HERO_VIDEOS = [
  "https://customer-assets.emergentagent.com/job_fitness-hub-28/artifacts/9acvnc7j_social_based.him_A_vibrant_dynamic_photograph_captures_a_full_body_y_6b0e1611-f8ba-498d-82cb-f11a897e2e3c_1.mp4",
  "https://customer-assets.emergentagent.com/job_fitness-hub-28/artifacts/ecnrqgwm_social_based.him_A_vibrant_dynamic_photograph_captures_a_young_man_r_b5e14506-2983-42c6-8ad5-d9fd686f8466_3.mp4",
  "https://customer-assets.emergentagent.com/job_fitness-hub-28/artifacts/nviy43ax_08%281%29.mov",
  "https://customer-assets.emergentagent.com/job_fitness-hub-28/artifacts/m42oytgc_0728.mov",
  "https://customer-assets.emergentagent.com/job_fitness-hub-28/artifacts/yqyftmfn_social_based.him_A_vibrant_dynamic_zoomed_out_photograph_of_a_full_b_4e9f2572-18d6-4c2b-9b4f-ee49eec6d415_1.mp4"
]

const LIFESTYLE_IMAGES = [
  "https://images.unsplash.com/photo-1593810451056-0acc1fad48c5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwc3R1ZGlvfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1MzczOTYzMXww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1598596583430-c81c94b52dad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHx5b2dhJTIwc3R1ZGlvfGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc1MzczOTYzMXww&ixlib=rb-4.1.0&q=85"
]

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const heroRef = useRef(null)

  // Auto-rotate videos with smooth transitions (3 seconds per video)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Videos with Smooth Transition */}
      <div className="absolute inset-0">
        {HERO_VIDEOS.map((videoSrc, index) => (
          <video
            key={index}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
              index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              transitionDuration: '2000ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Fallback for this specific video */}
            {index === 0 && (
              <img 
                src={LIFESTYLE_IMAGES[0]} 
                alt="Fitness Hero"
                className="w-full h-full object-cover"
              />
            )}
          </video>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1E]/80 via-[#1C1C1E]/60 to-transparent z-20"></div>
      </div>

      {/* Video Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {HERO_VIDEOS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideoIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentVideoIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-30 text-center text-white px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <span className="text-white/90 text-sm font-medium">✨ Join 50,000+ fitness enthusiasts</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
          Train. Book.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Thryve.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
          The future of fitness is here. Book classes, manage your studio, and connect with your community — all in one stunning platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/marketplace">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Book a Class
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        
        <div className="text-white/70 text-sm">
          Join thousands of studios and fitness enthusiasts worldwide
        </div>
      </div>
    </section>
  )
}