'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Play, Pause, Quote } from 'lucide-react'

export default function Hero() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState<'left' | 'right'>('left')

  const reviews = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely love the quality of their premium nuts! The packaging is luxurious and the taste is unmatched. Best investment in healthy snacking I've made.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      date: "2 days ago"
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "Exceptional service and premium products. The dry fruits are fresh and delivered right on time. Highly recommend AR Nuts!",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      date: "5 days ago"
    },
    {
      name: "Emily Rodriguez",
      location: "London, UK",
      rating: 5,
      text: "The organic seeds and nuts have become my daily go-to snack. Great taste, healthy options, and wonderful customer support.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      date: "1 week ago"
    },
    {
      name: "David Kim",
      location: "Sydney, Australia",
      rating: 5,
      text: "Best quality nuts I've ever purchased online. The gift boxes are perfect for corporate gifting. Will definitely order again!",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      date: "2 weeks ago"
    }
  ]

  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
      setDirection('right')
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isPlaying, reviews.length])

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length)
    setDirection('right')
  }

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    setDirection('left')
  }

  return (
    <>
      {/* Hero Section with Professional Background Image */}
      <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] mx-2 shadow-2xl mt-4">
        {/* Professional Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=2070&auto=format&fit=crop"
            alt="Premium nuts and dry fruits assortment"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Professional Gradient Overlay - Darker for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-brand-gold/30"></div>
        </div>

        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-gold font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4 text-xs md:text-sm backdrop-blur-sm bg-white/10 inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full"
          >
            SINCE 2025
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl"
          >
            Premium Quality <br />
            <span className="bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent italic">
              Nuts & Snacks
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-10 max-w-3xl mx-auto backdrop-blur-sm px-4"
          >
            Discover our modern luxury selection of organic snacks, crafted for health and curated for taste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center px-4 sm:px-0"
          >
            <Link 
              href="/shop"
              className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-black rounded-full hover:from-yellow-500 hover:to-brand-gold transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 text-sm md:text-base"
            >
              Shop the Collection →
            </Link>
            <Link 
              href="/category"
              className="px-6 md:px-10 py-3 md:py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-brand-black transition-all duration-300 font-semibold backdrop-blur-sm text-sm md:text-base"
            >
              View Categories
            </Link>
          </motion.div>

          {/* Stats Section - Mobile First */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/20 max-w-3xl mx-auto px-4"
          >
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-brand-gold">200+</div>
              <div className="text-xs md:text-sm text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-brand-gold">50+</div>
              <div className="text-xs md:text-sm text-white/80">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-brand-gold">4.9</div>
              <div className="text-xs md:text-sm text-white/80">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-brand-gold">24/7</div>
              <div className="text-xs md:text-sm text-white/80">Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Reviews Carousel Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-brand-gold fill-brand-gold" />
              <span className="text-brand-gold font-semibold text-sm md:text-base">4.9/5 Rating</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-brand-black mb-3 md:mb-4 px-4">
              What Our Customers Say
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Join 200+ satisfied customers who trust AR Nuts for premium quality snacks
            </p>
          </div>

          {/* Reviews Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute -top-10 md:-top-12 right-0 z-20 p-1.5 md:p-2 bg-brand-black/10 rounded-full hover:bg-brand-black/20 transition"
            >
              {isPlaying ? <Pause size={16} className="md:w-5 md:h-5" /> : <Play size={16} className="md:w-5 md:h-5" />}
            </button>

            {/* Review Cards */}
            <div className="overflow-hidden px-2">
              <motion.div
                key={currentReviewIndex}
                initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 mx-auto"
              >
                <Quote className="w-8 h-8 md:w-12 md:h-12 text-brand-gold/20 mb-3 md:mb-4" />
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4">
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={reviews[currentReviewIndex].image}
                      alt={reviews[currentReviewIndex].name}
                      fill
                      className="object-cover"
                      unoptimized={reviews[currentReviewIndex].image.includes('randomuser')}
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-base md:text-lg text-brand-black">
                      {reviews[currentReviewIndex].name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">{reviews[currentReviewIndex].location}</p>
                    <div className="flex gap-0.5 md:gap-1 mt-1 justify-center sm:justify-start">
                      {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4 text-center sm:text-left">
                  "{reviews[currentReviewIndex].text}"
                </p>
                <p className="text-xs text-gray-400 text-center sm:text-left">Verified Purchase • {reviews[currentReviewIndex].date}</p>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 md:-ml-6 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-brand-black" />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 md:-mr-6 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-brand-black" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentReviewIndex(index)
                    setDirection(index > currentReviewIndex ? 'right' : 'left')
                    setIsPlaying(false)
                  }}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${
                    index === currentReviewIndex ? 'w-6 md:w-8 bg-brand-gold' : 'w-1.5 md:w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Google Badge */}
          <div className="text-center mt-8 md:mt-12">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-white shadow-lg rounded-full px-4 md:px-6 py-2 md:py-3">
              <Image
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                width={46}
                height={15}
                className="h-3 w-auto md:h-4"
                unoptimized
              />
              <span className="text-xl md:text-2xl font-bold text-brand-black">4.9</span>
              <div className="flex gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs md:text-sm text-gray-600">(200+ reviews)</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}