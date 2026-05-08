import { createClient } from '@/lib/supabase/server'
import ShopClient from '@/components/public/ShopClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop | AR Nuts & Snacks',
  description: 'Browse our full collection of premium dry fruits, nuts, seeds, and healthy mixes.',
}

// Revalidate this page every 60 seconds so new products appear almost instantly
export const revalidate = 60

export default async function ShopPage() {
  const supabase = await createClient()

  // 1. Fetch all products securely on the server
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  // 2. Fetch all categories for the sidebar
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen bg-brand-cream">
      <ShopClient 
        initialProducts={products || []} 
        categories={categories || []} 
      />
    </div>
  )
}