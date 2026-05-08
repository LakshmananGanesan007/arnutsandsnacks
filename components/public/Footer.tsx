import Link from 'next/link'
import { MapPin, Phone, Mail, Share2, Link as LinkIcon, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-cream pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-gold mb-6">
              AR Nuts & Snacks
            </h3>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-6">
              Premium quality dry fruits, organic nuts, and healthy snacks curated for luxury and taste. Since 2025.
            </p>
            <div className="flex gap-4">
              {/* Replaced missing Lucide brand icons with generic social indicators for now */}
              <a href="#" aria-label="Social 1" className="text-brand-cream/70 hover:text-brand-gold transition"><Share2 size={20} /></a>
              <a href="#" aria-label="Social 2" className="text-brand-cream/70 hover:text-brand-gold transition"><Globe size={20} /></a>
              <a href="#" aria-label="Social 3" className="text-brand-cream/70 hover:text-brand-gold transition"><LinkIcon size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li><Link href="/shop" className="hover:text-brand-gold transition">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition">Our Story</Link></li>
              <li><Link href="/terms" className="hover:text-brand-gold transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li><Link href="/category/nuts" className="hover:text-brand-gold transition">Premium Nuts</Link></li>
              <li><Link href="/category/dry-fruits" className="hover:text-brand-gold transition">Dry Fruits</Link></li>
              <li><Link href="/category/seeds" className="hover:text-brand-gold transition">Healthy Seeds</Link></li>
              <li><Link href="/category/chocolates" className="hover:text-brand-gold transition">Chocolates</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-brand-cream/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Vembar, Thoothukodo</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>support@arnuts.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-cream/50">
          <p>&copy; {new Date().getFullYear()} AR Nuts & Snacks. All rights reserved.</p>
          <p>Designed with HelloWeb</p>
        </div>
      </div>
    </footer>
  )
}