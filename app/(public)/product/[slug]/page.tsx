import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductDetailClient from '@/components/public/ProductDetailClient'
import { Metadata } from 'next'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('title').eq('slug', params.slug).single();
  
  return {
    title: `${product?.title || 'Product'} | AR Nuts & Snacks`,
  }
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  // Fetch product with category name
  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('slug', params.slug)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailClient product={product} />
      </div>
    </div>
  )
}