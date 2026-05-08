'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)
  const pathname = usePathname()
  
  // Connect to your Zustand store for the cart count
  const items = useCartStore((state) => state.items)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => setIsOpen(false), [pathname])

  // Handle page refresh on logo click
  const handleLogoRefresh = () => {
    window.location.reload()
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Our Story', href: '/about' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-lg' : 'bg-white/95 backdrop-blur-sm py-5'
    } border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo - Left Corner with Refresh */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleLogoRefresh}
              className="flex items-center space-x-3 group focus:outline-none"
              aria-label="Refresh page"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                {!imageError ? (
                  <Image
                    src="/logo.arnutslogo.png"
                    alt="AR Nuts Logo"
                    fill
                    className="object-contain transition-transform group-hover:scale-105"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-brand-gold rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AR</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-serif font-bold text-brand-black tracking-tight leading-tight">
                  AR <span className="text-brand-gold group-hover:text-brand-green transition-colors">Nuts</span>
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Premium Quality Nuts</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-bold tracking-widest uppercase transition-all hover:text-brand-gold hover:scale-105 ${
                  pathname === link.href ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-brand-black/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Actions - Top Right Corner */}
          <div className="flex items-center space-x-4">
            {/* Logo Image in Top Right Corner */}
            <button 
              onClick={handleLogoRefresh}
              className="relative w-10 h-10 flex-shrink-0 md:hidden focus:outline-none"
              aria-label="Refresh page"
            >
              {!imageError ? (
                <Image
                  src="/logo.arnutslogo.png"
                  alt="AR Nuts Logo"
                  fill
                  className="object-contain rounded-full hover:scale-105 transition-transform"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-brand-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AR</span>
                </div>
              )}
            </button>

            {/* Search - Enterprise with keyboard shortcut hint */}
            <button 
              className="text-brand-black hover:text-brand-gold transition-colors hidden sm:block relative group"
              aria-label="Search"
            >
              <Search size={20} />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                ⌘ + K
              </span>
            </button>
            
            {/* Admin Access */}
            <Link 
              href="/admin/login" 
              className="text-brand-black hover:text-brand-gold transition-colors relative group"
              aria-label="Admin login"
            >
              <User size={20} />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Admin
              </span>
            </Link>
            
            {/* Cart Button with Enterprise Badge */}
            <Link href="/cart" className="relative group p-2" aria-label="Shopping cart">
              <ShoppingBag size={24} className="text-brand-black group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[10px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center animate-in zoom-in border-2 border-white shadow-md px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-brand-black p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay - Enterprise Grade */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white/98 backdrop-blur-sm z-50 animate-in slide-in-from-right duration-300 shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-2xl font-serif font-bold text-brand-black border-b border-gray-100 pb-4 hover:text-brand-gold transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Mobile Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 text-gray-600 py-3">
                  <Search size={20} />
                  <span>Search Products</span>
                </button>
                <Link 
                  href="/shop" 
                  className="w-full bg-brand-black text-white py-4 rounded-2xl flex justify-center items-center font-bold hover:bg-brand-green transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Feature: Keyboard shortcut for search */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              // Add your search modal/dialog logic here
              console.log('Search shortcut triggered');
            }
          });
        `
      }} />
    </nav>
  )
}