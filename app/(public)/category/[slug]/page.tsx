import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/public/ProductCard'

export const revalidate = 3600; 

// Note: params is now a Promise in the latest Next.js versions
export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  // 1. Unwrapping params per Next.js 15/16 requirements
  const params = await props.params;
  const supabase = await createClient();

  // 2. Fetch Category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!category) {
    notFound();
  }

  // 3. Fetch Products for this Category
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      {/* Category Hero Header */}
      <div className="bg-brand-green text-brand-cream py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 capitalize">
          {category.name}
        </h1>
        <p className="text-brand-cream/80 max-w-2xl mx-auto">
          Discover our premium selection of organic, carefully sourced {category.name.toLowerCase()}.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-brand-black/60 font-medium">Showing {products?.length || 0} products</p>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-brand-black/50 border-2 border-dashed border-brand-black/10 rounded-3xl">
            <p className="text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}