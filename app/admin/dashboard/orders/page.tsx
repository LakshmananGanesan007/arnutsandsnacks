'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Package, Truck, CheckCircle, XCircle, Clock, BellRing } from 'lucide-react'

// Define the Order Type locally for the dashboard
interface Order {
  id: string
  customer_name: string
  phone: string
  address: string
  items: any[]
  total: number
  payment_method: string
  status: string
  created_at: string
}

export default function AdminOrdersPage() {
  const supabase = createClient()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [newOrderPopup, setNewOrderPopup] = useState<Order | null>(null)

  // Fetch orders and set up Realtime listener
  useEffect(() => {
    fetchOrders()

    // Enterprise Feature: Listen for live incoming orders
    const channel = supabase
      .channel('live-orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new as Order
          
          // 1. Play a notification sound
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
          audio.play().catch(() => console.log('Browser blocked autoplay sound'))

          // 2. Show Popup
          setNewOrderPopup(newOrder)
          
          // 3. Add to the top of the list
          setOrders((prev) => [newOrder, ...prev])

          // Hide popup after 5 seconds
          setTimeout(() => setNewOrderPopup(null), 5000)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setOrders(data)
    setLoading(false)
  }

  // Update Order Status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    if (!error) {
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order))
    } else {
      alert("Failed to update status")
    }
  }

  // Helper for Status UI
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Confirmed': return 'bg-blue-100 text-blue-800'
      case 'Shipped': return 'bg-indigo-100 text-indigo-800'
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-brand-gold" size={32} /></div>

  return (
    <div className="relative">
      {/* Live Order Popup */}
      {newOrderPopup && (
        <div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-brand-gold shadow-2xl p-4 rounded-xl flex items-start gap-4 animate-slide-up">
          <div className="bg-brand-cream p-3 rounded-full">
            <BellRing className="text-brand-green animate-bounce" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-brand-black">New Order Received!</h4>
            <p className="text-sm text-brand-black/60">{newOrderPopup.customer_name} just paid ₹{newOrderPopup.total} via {newOrderPopup.payment_method}</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-black">Orders Management</h1>
        <p className="text-brand-black/60">View and update customer orders in real-time.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-brand-black/60 uppercase tracking-wider">
                <th className="p-4 font-medium">Order details</th>
                <th className="p-4 font-medium">Customer Info</th>
                <th className="p-4 font-medium">Items & Total</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  
                  {/* ID and Date */}
                  <td className="p-4 align-top">
                    <p className="font-mono text-xs font-bold text-brand-black mb-1">#{order.id.split('-')[0].toUpperCase()}</p>
                    <p className="text-xs text-brand-black/50">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                    </p>
                    <p className="mt-2 text-xs font-bold px-2 py-1 bg-brand-cream inline-block rounded border border-brand-black/10">
                      {order.payment_method}
                    </p>
                  </td>

                  {/* Customer Info */}
                  <td className="p-4 align-top">
                    <p className="font-bold text-brand-black">{order.customer_name}</p>
                    <p className="text-sm text-brand-black/70 mb-1">📞 {order.phone}</p>
                    <p className="text-xs text-brand-black/50 line-clamp-2 max-w-[200px]">{order.address}</p>
                  </td>

                  {/* Items and Total */}
                  <td className="p-4 align-top">
                    <p className="text-lg font-bold text-brand-green mb-1">₹{order.total}</p>
                    <div className="text-xs text-brand-black/70 max-w-[200px] space-y-1">
                      {order.items.map((item: any, index: number) => (
                        <p key={index} className="truncate">
                          {item.quantity}x {item.title} ({item.selectedWeight})
                        </p>
                      ))}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-4 align-top">
                    <select
                      className={`text-sm font-bold px-3 py-2 rounded-xl outline-none border-2 border-transparent focus:border-brand-gold cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">🕒 Pending</option>
                      <option value="Confirmed">✅ Confirmed</option>
                      <option value="Shipped">🚚 Shipped</option>
                      <option value="Delivered">📦 Delivered</option>
                      <option value="Cancelled">❌ Cancelled</option>
                    </select>
                  </td>

                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-brand-black/50">No orders yet. They will appear here live!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}