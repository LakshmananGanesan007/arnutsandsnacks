'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/lib/store'
import { CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const supabase = createClient()
  
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1) // 1: Details, 2: Payment
  const [isLoading, setIsLoading] = useState(false)
  const [adminUpiId, setAdminUpiId] = useState('loading...')

  // Form State
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', notes: ''
  })

  // Load UPI ID from Supabase on mount
  useEffect(() => {
    setMounted(true)
    if (items.length === 0) router.push('/cart')

    const fetchUpiId = async () => {
      const { data } = await supabase.from('store_settings').select('upi_id').eq('id', 1).single()
      if (data) setAdminUpiId(data.upi_id)
    }
    fetchUpiId()
  }, [items, router, supabase])

  if (!mounted) return null

  // Generate dynamic UPI Payment URL for the QR Code
  const upiUrl = `upi://pay?pa=${adminUpiId}&pn=AR Nuts & Snacks&am=${totalPrice()}&cu=INR`
  // Using a free reliable QR code generator API to keep bundle size small
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    
    // Insert into Supabase Orders table
    const { error } = await supabase.from('orders').insert([{
      customer_name: formData.name,
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes,
      items: items,
      total: totalPrice(),
      payment_method: 'UPI QR',
      status: 'Pending' // Admin reviews and updates this to 'Confirmed' upon payment receipt
    }])

    setIsLoading(false)

    if (!error) {
      clearCart()
      router.push('/order-success')
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-serif font-bold text-center text-brand-black mb-8">Secure Checkout</h1>

      <div className="bg-white rounded-3xl shadow-lg border border-brand-black/5 overflow-hidden">
        {/* Progress Bar */}
        <div className="flex border-b border-brand-black/5">
          <div className={`flex-1 text-center py-4 font-medium ${step === 1 ? 'bg-brand-cream text-brand-black' : 'text-brand-black/40'}`}>
            1. Shipping Details
          </div>
          <div className={`flex-1 text-center py-4 font-medium ${step === 2 ? 'bg-brand-cream text-brand-black' : 'text-brand-black/40'}`}>
            2. UPI Payment
          </div>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleProceedToPayment} className="space-y-6 max-w-xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-brand-black/20 focus:ring-2 focus:ring-brand-gold outline-none" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile Number (WhatsApp)</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-brand-black/20 focus:ring-2 focus:ring-brand-gold outline-none" 
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Complete Delivery Address</label>
                <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-brand-black/20 focus:ring-2 focus:ring-brand-gold outline-none resize-none"
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Order Notes (Optional)</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-black/20 focus:ring-2 focus:ring-brand-gold outline-none"
                  value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-brand-black text-brand-cream py-4 rounded-xl font-bold hover:bg-brand-green transition-colors mt-6">
                Proceed to Payment
              </button>
            </form>
          ) : (
            <div className="text-center max-w-md mx-auto space-y-6">
              <div className="bg-brand-cream p-6 rounded-2xl border border-brand-black/10">
                <p className="text-brand-black/60 text-sm font-medium uppercase tracking-wider mb-2">Total Amount to Pay</p>
                <h2 className="text-4xl font-bold text-brand-black mb-6">₹{totalPrice()}</h2>
                
                <div className="bg-white p-4 rounded-xl inline-block shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeImageUrl} alt="UPI QR Code" className="w-48 h-48 mx-auto" />
                </div>
                
                <p className="mt-4 text-brand-black/80 font-medium">Scan with any UPI App</p>
                <p className="text-sm text-brand-black/50 mt-1">GPay, PhonePe, Paytm, BHIM</p>
                <p className="mt-4 text-xs font-mono bg-brand-black/5 py-2 rounded">UPI ID: {adminUpiId}</p>
              </div>

              <div className="flex items-start gap-3 text-left bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
                <ShieldCheck className="shrink-0 text-blue-600" />
                <p>After completing the payment on your app, click the button below. Our team will verify the payment and dispatch your order.</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold border border-brand-black text-brand-black hover:bg-brand-black/5 transition-colors">
                  Back
                </button>
                <button onClick={handlePlaceOrder} disabled={isLoading} className="flex-1 bg-brand-green text-brand-cream py-4 rounded-xl font-bold hover:bg-brand-black transition-colors flex justify-center items-center gap-2">
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={20} /> I Have Paid, Place Order</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}