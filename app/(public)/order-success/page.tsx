import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto bg-white p-12 rounded-3xl shadow-xl border border-brand-black/5">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-brand-green" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-brand-black mb-4">Order Received!</h1>
        <p className="text-brand-black/70 mb-8 leading-relaxed">
          Thank you for choosing AR Nuts & Snacks. Your order is currently <span className="font-bold text-brand-gold">Pending Verification</span>. We are verifying your UPI payment and will notify you via WhatsApp once shipped.
        </p>
        <Link 
          href="/shop"
          className="inline-block px-8 py-4 bg-brand-black text-brand-cream rounded-full hover:bg-brand-green transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}