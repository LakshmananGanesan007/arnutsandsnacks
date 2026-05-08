'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2, QrCode } from 'lucide-react'

export default function SettingsPage() {
  const supabase = createClient()
  const [upiId, setUpiId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('store_settings').select('upi_id').eq('id', 1).single()
      if (data) setUpiId(data.upi_id)
      setLoading(false)
    }
    fetchSettings()
  }, [supabase])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('store_settings')
      .update({ upi_id: upiId, updated_at: new Date().toISOString() })
      .eq('id', 1)

    setSaving(false)
    if (error) {
      setMessage('Failed to update UPI ID.')
    } else {
      setMessage('Settings updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  if (loading) return <div className="p-8">Loading settings...</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-serif font-bold text-brand-black mb-8">Store Settings</h1>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="bg-brand-cream p-3 rounded-xl">
            <QrCode className="text-brand-green" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-black">Payment Settings</h2>
            <p className="text-brand-black/60 text-sm">Update the UPI ID used for customer checkouts.</p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-black mb-2">
              Store UPI ID (GPay, PhonePe, Paytm)
            </label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold outline-none font-mono"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. arnuts@okicici"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={saving}
            className="bg-brand-black text-brand-cream px-8 py-3 rounded-xl font-bold hover:bg-brand-green transition-colors flex items-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}