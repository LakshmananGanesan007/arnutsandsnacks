'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Star, ShieldCheck, Truck, AlertCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store'

export default function ProductDetailClient({ product }: { product: any }) {
  const { addItem } = useCartStore()
  
  const availableWeights = product?.weights && product.weights.length > 0 
    ? product.weights 
    : [{ label: 'Standard', multiplier: 1 }]

  const [selectedWeight, setSelectedWeight] = useState(availableWeights[0])
  const [added, setAdded] = useState(false)

  const basePrice = product?.discount_price || 0
  const currentPrice = Math.round(basePrice * (selectedWeight?.multiplier || 1))

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      selectedPrice: currentPrice,
      image: product.image,
      selectedWeight: selectedWeight.label,
      quantity: 1
    })
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return <div className="text-center py-20">Product not found.</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* Left: Image Section - FIXED for Visibility */}
      <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-brand-black/5 bg-white shadow-2xl">
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover z-10"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=Image+Not+Found'
          }}
        />
        {product.popular && (
          <span className="absolute top-6 left-6 bg-brand-gold text-brand-black px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase z-20 shadow-lg">
            Best Seller
          </span>
        )}
      </div>

      {/* Right: Content Section */}
      <div className="flex flex-col">
        <p className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4">
          {product.categories?.name || 'Premium Selection'}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-black mb-6 leading-tight">
          {product.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex text-brand-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
          <span className="text-brand-black/40 text-sm font-medium">Verified Quality</span>
        </div>

        <p className="text-brand-black/70 leading-relaxed mb-10 text-lg">
          {product.short_description || 'Handpicked organic snacks for your healthy lifestyle.'}
        </p>

        <div className="flex items-baseline gap-4 mb-10">
          <span className="text-4xl font-bold text-brand-green">₹{currentPrice}</span>
          {product.actual_price > product.discount_price && (
            <span className="text-xl text-brand-black/30 line-through">
              ₹{Math.round(product.actual_price * (selectedWeight?.multiplier || 1))}
            </span>
          )}
        </div>

        <div className="mb-10">
          <span className="block text-sm font-bold text-brand-black mb-4 uppercase tracking-widest">Weight</span>
          <div className="flex flex-wrap gap-3">
            {availableWeights.map((w: any) => (
              <button
                key={w.label}
                onClick={() => setSelectedWeight(w)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all border-2 ${
                  selectedWeight.label === w.label 
                  ? 'border-brand-black bg-brand-black text-brand-cream shadow-xl' 
                  : 'border-brand-black/10 bg-white text-brand-black'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
            added ? 'bg-brand-green text-brand-cream' : 'bg-brand-black text-brand-cream hover:bg-brand-green'
          }`}
        >
          {added ? <><Check size={24} /> Added</> : <><ShoppingCart size={24} /> Add to Cart</>}
        </button>
      </div>
    </div>
  )
}