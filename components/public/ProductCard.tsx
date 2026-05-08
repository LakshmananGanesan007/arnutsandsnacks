'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  
  // Calculate discount percentage
  const discountPercent = product.discount_price 
    ? Math.round(((product.actual_price - product.discount_price) / product.actual_price) * 100) 
    : 0;

  const currentPrice = product.discount_price || product.actual_price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page when clicking button
    addItem({
      ...product,
      quantity: 1,
      selectedPrice: currentPrice,
      // Default to first weight option if available, else null
      selectedWeight: product.weight_options?.[0]?.weight || 'Standard', 
    });
  }

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white/40 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.trending && (
          <span className="bg-brand-gold text-brand-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Trending
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Image Container with Zoom effect */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-brand-cream/50">
        <Image
          src={product.images[0] || '/placeholder-image.jpg'}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick View Overlay (Visible on Hover) */}
        <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white/90 text-brand-black rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-gold hover:text-white">
            <Eye size={20} />
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-serif font-semibold text-brand-black mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-brand-black/60 mb-4 line-clamp-2">
          {product.short_description}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-xl font-bold text-brand-black">
              ₹{currentPrice}
            </span>
            {product.discount_price && (
              <span className="text-sm text-brand-black/40 line-through ml-2">
                ₹{product.actual_price}
              </span>
            )}
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={cn(
              "p-3 rounded-full transition-all duration-300",
              product.stock === 0 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                : "bg-brand-black text-brand-cream hover:bg-brand-green hover:shadow-lg transform active:scale-95"
            )}
            aria-label="Add to cart"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}