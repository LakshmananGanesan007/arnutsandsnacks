'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  ShoppingBag, 
  LogOut, 
  FolderTree // Added missing icon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-black text-brand-cream flex flex-col hidden md:flex">
        <div className="p-6 border-b border-brand-cream/10">
          <h2 className="text-xl font-serif font-bold text-brand-gold">AR Nuts Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-cream/10 transition"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link 
            href="/admin/dashboard/orders" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-cream/10 transition"
          >
            <ShoppingBag size={20} /> Orders
          </Link>

          <Link 
            href="/admin/dashboard/categories" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-cream/10 transition"
          >
            <FolderTree size={20} /> Categories
          </Link>

          <Link 
            href="/admin/dashboard/products" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-cream/10 transition"
          >
            <Package size={20} /> Products
          </Link>

          <Link 
            href="/admin/dashboard/settings" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-cream/10 transition"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-brand-cream/10">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-400/10 rounded-xl transition cursor-pointer"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}