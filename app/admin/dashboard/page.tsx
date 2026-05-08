'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  ShoppingBag, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle,
  Clock,
  Package // FIXED: Added missing import
} from 'lucide-react'

export default function AdminDashboard() {
  const supabase = createClient()
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStock: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch Orders for revenue and count
        const { data: orders } = await supabase.from('orders').select('total, status')
        
        // Fetch Products for stock alerts
        const { data: products } = await supabase.from('products').select('stock')

        if (orders && products) {
          const revenue = orders.reduce((sum, order) => sum + Number(order.total), 0)
          const pending = orders.filter(o => o.status === 'Pending').length
          const lowStockCount = products.filter(p => p.stock < 10).length

          setStats({
            totalOrders: orders.length,
            totalRevenue: revenue,
            pendingOrders: pending,
            lowStock: lowStockCount
          })
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  const statCards = [
    { label: 'Total Revenue', value: `₹${stats.totalRevenue}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Low Stock Items', value: stats.lowStock, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ]

  if (loading) return (
    <div className="p-8 flex items-center gap-3 text-brand-black/50">
      <div className="h-5 w-5 border-2 border-brand-gold border-t-transparent animate-spin rounded-full"></div>
      Loading dashboard stats...
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-black">Dashboard Overview</h1>
        <p className="text-brand-black/60">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-2xl`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <TrendingUp className="text-gray-300" size={20} />
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-brand-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-brand-black text-brand-cream p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
            <p className="text-brand-cream/60 mb-6 text-sm">You have {stats.lowStock} items running low on stock. Update them now to avoid missing sales.</p>
            <button className="bg-brand-gold text-brand-black px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors">
              Manage Products
            </button>
          </div>
          {/* FIXED: Icon is now correctly defined and imported */}
          <Package className="absolute -right-8 -bottom-8 text-white/5 group-hover:text-white/10 transition-colors duration-500" size={180} />
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-brand-black mb-4">Store Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="text-sm font-medium text-brand-black">Payment Gateway (UPI)</span>
              <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="text-sm font-medium text-brand-black">Ordering System</span>
              <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}