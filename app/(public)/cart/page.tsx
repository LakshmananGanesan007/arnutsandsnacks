'use client'

import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-brand-gold mb-4" />
        <h2 className="text-2xl font-bold">Your bag is empty</h2>
        <Link href="/shop" className="mt-6 bg-brand-black text-brand-cream px-8 py-3 rounded-full">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedWeight}`} className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-6 shadow-sm">
              
              {/* FIXED IMAGE CONTAINER: Using item.images?.[0] instead of item.image */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img 
                  src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder-nut.jpg'} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.selectedWeight}</p>
                <p className="font-bold text-brand-green">₹{item.selectedPrice}</p>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                <span className="font-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
              </div>

              <button onClick={() => removeItem(item.id)} className="text-red-400 p-2">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-[2rem] border h-fit shadow-xl">
          <h3 className="text-xl font-bold mb-6">Total: ₹{totalPrice()}</h3>
          <Link href="/checkout" className="w-full bg-brand-black text-brand-cream py-4 rounded-xl font-bold flex justify-center items-center gap-2">
            Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}