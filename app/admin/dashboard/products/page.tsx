'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { uploadImageToCloudinary } from '@/lib/cloudinary'
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon } from 'lucide-react'
import { Product, Category } from '@/types'

export default function AdminProductsPage() {
  const supabase = createClient()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    title: '', category_id: '', actual_price: '', discount_price: '', 
    short_description: '', stock: '100', popular: false, trending: false
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*')
      ])
      
      if (productsRes.data) setProducts(productsRes.data)
      if (categoriesRes.data) setCategories(categoriesRes.data)
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  // Handle Product Submission
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = ''
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile)
      }

      // Generate a simple URL-friendly slug
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

      const { data, error } = await supabase.from('products').insert([{
        title: formData.title,
        slug: slug,
        category_id: formData.category_id,
        actual_price: parseFloat(formData.actual_price),
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
        short_description: formData.short_description,
        stock: parseInt(formData.stock),
        popular: formData.popular,
        trending: formData.trending,
        images: imageUrl ? [imageUrl] : [],
      }]).select()

      if (error) throw error

      // Update UI and close modal
      if (data) setProducts([data[0], ...products])
      setIsModalOpen(false)
      // Reset form
      setFormData({ title: '', category_id: categories[0]?.id || '', actual_price: '', discount_price: '', short_description: '', stock: '100', popular: false, trending: false })
      setImageFile(null)

    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product. Please check console.')
    } finally {
      setUploading(false)
    }
  }

  // Handle Product Deletion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-brand-gold" size={32} /></div>

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-black">Products</h1>
          <p className="text-brand-black/60">Manage your store inventory.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-black text-brand-cream px-6 py-3 rounded-xl font-bold hover:bg-brand-green transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-brand-black/60 uppercase tracking-wider">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Badges</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                      {product.images[0] ? (
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                      ) : (
                        <ImageIcon className="absolute inset-0 m-auto text-gray-300" size={24} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-brand-black line-clamp-1">{product.title}</p>
                      <p className="text-xs text-brand-black/50">{product.slug}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold">₹{product.discount_price || product.actual_price}</p>
                    {product.discount_price && <p className="text-xs text-brand-black/40 line-through">₹{product.actual_price}</p>}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock} left
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {product.trending && <span className="bg-brand-gold/20 text-brand-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Trending</span>}
                    {product.popular && <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Popular</span>}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-brand-black/40 hover:text-brand-gold transition"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-brand-black/40 hover:text-red-500 transition"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-black/50">No products found. Add your first product!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full my-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Title</label>
                  <input required type="text" className="w-full px-4 py-2 border rounded-xl" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required className="w-full px-4 py-2 border rounded-xl" value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}>
                    <option value="">Select a category...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Actual Price (₹)</label>
                  <input required type="number" className="w-full px-4 py-2 border rounded-xl" value={formData.actual_price} onChange={e => setFormData({...formData, actual_price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Price (₹)</label>
                  <input type="number" placeholder="Optional" className="w-full px-4 py-2 border rounded-xl" value={formData.discount_price} onChange={e => setFormData({...formData, discount_price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <input required type="number" className="w-full px-4 py-2 border rounded-xl" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <textarea required rows={2} className="w-full px-4 py-2 border rounded-xl" value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-cream file:text-brand-black hover:file:bg-brand-gold transition" />
              </div>

              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.trending} onChange={e => setFormData({...formData, trending: e.target.checked})} className="w-4 h-4 text-brand-gold rounded focus:ring-brand-gold" />
                  <span className="text-sm font-medium">Mark as Trending</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} className="w-4 h-4 text-brand-gold rounded focus:ring-brand-gold" />
                  <span className="text-sm font-medium">Mark as Popular</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 mt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition flex-1">Cancel</button>
                <button type="submit" disabled={uploading} className="px-6 py-3 rounded-xl bg-brand-black text-brand-cream font-bold hover:bg-brand-green transition flex-1 flex justify-center items-center gap-2">
                  {uploading ? <Loader2 className="animate-spin" size={20} /> : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}