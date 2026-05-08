'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { uploadImageToCloudinary } from '@/lib/cloudinary'
import { Plus, Trash2, Loader2, Image as ImageIcon, FolderTree } from 'lucide-react'
import { Category } from '@/types'

export default function AdminCategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Form State
  const [name, setName] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name', { ascending: true })
    if (data) setCategories(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = ''
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile)
      }

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

      const { data, error } = await supabase.from('categories').insert([{
        name,
        slug,
        image: imageUrl
      }]).select()

      if (error) throw error

      if (data) setCategories([...categories, data[0]])
      setIsModalOpen(false)
      setName('')
      setImageFile(null)
    } catch (err) {
      alert("Error creating category")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deleting this category will affect products linked to it. Continue?')) return
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (!error) setCategories(categories.filter(c => c.id !== id))
  }

  if (loading) return <div className="p-8">Loading categories...</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">Categories</h1>
          <p className="text-brand-black/60">Organize your products into collections.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-brand-black text-brand-cream px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-green transition">
          <Plus size={20} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm group">
            <div className="aspect-video relative bg-brand-cream">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={32} /></div>
              )}
              <button 
                onClick={() => handleDelete(cat.id)}
                className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-sm"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4 text-center font-bold text-brand-black">
              {cat.name}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full">
            <h2 className="text-2xl font-serif font-bold mb-6">New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input required type="text" className="w-full px-4 py-2 border rounded-xl" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Premium Nuts" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" disabled={uploading} className="flex-1 px-4 py-2 bg-brand-black text-brand-cream rounded-xl font-bold flex justify-center items-center gap-2">
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}