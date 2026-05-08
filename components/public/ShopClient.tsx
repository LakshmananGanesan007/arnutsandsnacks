'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Product, Category } from '@/types'
import ProductCard from './ProductCard'

interface ShopClientProps {
  initialProducts: Product[]
  categories: Category[]
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')

  // Instant Client-Side Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Filter by Search Query
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.short_description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 2. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category_id === selectedCategory)
    }

    // 3. Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.discount_price || a.actual_price) - (b.discount_price || b.actual_price))
        break
      case 'price-high':
        result.sort((a, b) => (b.discount_price || b.actual_price) - (a.discount_price || a.actual_price))
        break
      case 'popular':
        result.sort((a, b) => (a.popular === b.popular ? 0 : a.popular ? -1 : 1))
        break
      case 'newest':
      default:
        // Already sorted by newest from the server
        break
    }

    return result
  }, [initialProducts, searchQuery, selectedCategory, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brand-black mb-2">Our Collection</h1>
          <p className="text-brand-black/60">Discover our premium quality nuts and snacks.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-4 top-3 text-brand-black/40" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-12 pr-4 py-2.5 rounded-full border border-brand-black/10 bg-white focus:ring-2 focus:ring-brand-gold outline-none transition-shadow"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-brand-black/10 rounded-full px-4 py-2.5 w-full sm:w-auto">
            <SlidersHorizontal size={18} className="text-brand-black/40 mr-2 shrink-0" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none cursor-pointer w-full text-sm font-medium"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-brand-black/5 sticky top-32 shadow-sm">
            <h3 className="text-lg font-bold font-serif mb-4 border-b border-brand-black/5 pb-4">Categories</h3>
            <div className="space-y-3 flex flex-col">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`text-left px-4 py-2 rounded-xl transition-colors text-sm font-medium ${selectedCategory === 'all' ? 'bg-brand-black text-brand-cream' : 'text-brand-black/70 hover:bg-brand-cream'}`}
              >
                All Products
              </button>
              {categories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-left px-4 py-2 rounded-xl transition-colors text-sm font-medium ${selectedCategory === category.id ? 'bg-brand-black text-brand-cream' : 'text-brand-black/70 hover:bg-brand-cream'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-brand-black/5">
              <h2 className="text-2xl font-serif text-brand-black mb-2">No products found</h2>
              <p className="text-brand-black/50">Try adjusting your search or filter criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
                className="mt-6 px-6 py-2 border border-brand-black text-brand-black rounded-full hover:bg-brand-black hover:text-brand-cream transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}