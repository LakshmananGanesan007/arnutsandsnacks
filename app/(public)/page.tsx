'use client'

import Hero from '@/components/public/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Clock } from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const categories = [
    {
      name: 'Premium Nuts',
      slug: 'premium-nuts',
      image: 'https://images.pexels.com/photos/6120214/pexels-photo-6120214.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Cashews, Almonds, Walnuts & More',
      items: '24+ Products',
      color: 'from-amber-800/60 to-amber-900/60'
    },
    {
      name: 'Dry Fruits',
      slug: 'dry-fruits',
      image: 'https://images.pexels.com/photos/1061219/pexels-photo-1061219.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Premium Quality Dried Fruits',
      items: '18+ Products',
      color: 'from-orange-800/60 to-orange-900/60'
    },
    {
      name: 'Healthy Seeds',
      slug: 'healthy-seeds',
      image: 'https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Chia, Flax, Pumpkin & More',
      items: '12+ Products',
      color: 'from-green-800/60 to-green-900/60'
    },
    {
      name: 'Chocolates',
      slug: 'chocolates',
      image: 'https://images.pexels.com/photos/65882/chocolate-dark-close-up-confectionery-65882.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Luxury Chocolate Treats',
      items: '15+ Products',
      color: 'from-red-800/60 to-red-900/60'
    }
  ]

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Premium Quality',
      description: '100% organic & naturally sourced'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Premium Quality',
      description: '100% organic & naturally sourced'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Customer service excellence'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Trusted Brand',
      description: '4.9/5 from 200+ customers'
    }
  ]

  const handleCategoryClick = () => {
    window.location.href = '/shop'
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16 md:pb-20">
      {/* Hero Section */}
      <Hero />

      {/* Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 md:-mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-brand-gold mb-2 md:mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-brand-black text-xs md:text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 px-4 py-2 rounded-full mb-4">
            <span className="text-brand-gold font-semibold text-sm">Premium Selection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-black mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Discover our curated collection of premium nuts, dry fruits, and healthy snacks
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onClick={handleCategoryClick}
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={75}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/6120214/pexels-photo-6120214.jpeg?auto=compress&cs=tinysrgb&w=600';
                  }}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} group-hover:opacity-75 transition-opacity duration-500`}></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 w-fit text-xs font-semibold text-brand-black">
                    {category.items}
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-xs md:text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center gap-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Shop Now <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-black rounded-full hover:from-yellow-500 hover:to-brand-gold transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
          >
            Browse All Categories
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-gradient-to-r from-gray-50 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-black mb-2">
              Why Choose AR Nuts?
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Experience the difference of premium quality
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="w-7 h-7 md:w-8 md:h-8 text-brand-gold" />
              </div>
              <h4 className="font-semibold text-brand-black text-sm md:text-base mb-1">100% Organic</h4>
              <p className="text-gray-500 text-xs md:text-sm">Certified premium quality</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="w-7 h-7 md:w-8 md:h-8 text-brand-gold" />
              </div>
              <h4 className="font-semibold text-brand-black text-sm md:text-base mb-1">Premium Quality</h4>
              <p className="text-gray-500 text-xs md:text-sm">Best selection available</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Star className="w-7 h-7 md:w-8 md:h-8 text-brand-gold" />
              </div>
              <h4 className="font-semibold text-brand-black text-sm md:text-base mb-1">4.9 Rating</h4>
              <p className="text-gray-500 text-xs md:text-sm">From 200+ customers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="w-7 h-7 md:w-8 md:h-8 text-brand-gold" />
              </div>
              <h4 className="font-semibold text-brand-black text-sm md:text-base mb-1">24/7 Support</h4>
              <p className="text-gray-500 text-xs md:text-sm">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative bg-gradient-to-r from-brand-black to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-repeat" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-3">
              Ready to Experience Premium Quality?
            </h3>
            <p className="text-gray-300 mb-6 md:mb-8 text-sm md:text-base max-w-2xl mx-auto">
              Join 200+ happy customers who have made the switch to AR Nuts for their daily snacking needs
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-black rounded-full hover:from-yellow-500 hover:to-brand-gold transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
            >
              Start Shopping Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}