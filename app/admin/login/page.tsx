'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  // Clear any old sessions on mount to prevent loops
  useEffect(() => {
    supabase.auth.signOut()
  }, [supabase])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      if (data?.user) {
        // Force a refresh to ensure the Proxy/Middleware sees the new cookie
        router.refresh()
        // Small timeout to allow cookie propagation
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 500)
      }
    } catch (err) {
      setError("An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-brand-black/10">
        <div className="text-center mb-8">
          <div className="bg-brand-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-brand-gold" size={28} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-black">Admin Portal</h1>
          <p className="text-brand-black/60 mt-2">Sign in to manage AR Nuts & Snacks</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
            {error === "Invalid path specified in request URL" 
              ? "Supabase Config Error: Check your .env.local URL" 
              : error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-brand-black/40" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-black/20 focus:ring-2 focus:ring-brand-gold outline-none text-brand-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@arnuts.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-black mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-brand-black/40" size={20} />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-black/20 focus:ring-2 focus:ring-brand-gold outline-none text-brand-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-black text-brand-cream py-4 rounded-xl font-bold hover:bg-brand-green transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  )
}