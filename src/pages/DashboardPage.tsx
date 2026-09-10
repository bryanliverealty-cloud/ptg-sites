import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'
import {
  CreditCard,
  Package,
  Calendar,
  Loader2,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ArrowRight,
} from 'lucide-react'

type Subscription = Database['stripe_user_subscriptions']['Row']
type Order = Database['stripe_user_orders']['Row']

export default function DashboardPage() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (!user) return
      try {
        const [subRes, orderRes] = await Promise.all([
          supabase.from('stripe_user_subscriptions').select('*').maybeSingle(),
          supabase.from('stripe_user_orders').select('*').order('order_date', { ascending: false }),
        ])

        if (subRes.data) setSubscription(subRes.data as Subscription)
        if (orderRes.data) setOrders(orderRes.data as Order[])
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    )
  }

  const hasActiveSubscription =
    subscription &&
    ['active', 'trialing'].includes(subscription.subscription_status)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Welcome back{user?.email ? `, ${user.email}` : ''}.
        </p>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Subscription</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {hasActiveSubscription ? 'Active' : 'None'}
              </p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              hasActiveSubscription ? 'bg-success-100 text-success-600' : 'bg-gray-100 text-gray-400'
            }`}>
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Package className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Method</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {subscription?.payment_method_brand
                  ? `${subscription.payment_method_brand} •••• ${subscription.payment_method_last4}`
                  : 'None'}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscription details */}
      <div className="mb-8 card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <CreditCard className="h-5 w-5 text-primary-600" />
          Subscription Details
        </h2>

        {subscription ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <StatusBadge status={subscription.subscription_status} />
              {subscription.cancel_at_period_end && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-50 px-3 py-1 text-xs font-medium text-warning-700">
                  <Clock className="h-3 w-3" />
                  Cancels at period end
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {subscription.current_period_start && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Current period start</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(subscription.current_period_start * 1000).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
              {subscription.current_period_end && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Current period end</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(subscription.current_period_end * 1000).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-500">No active subscription.</p>
            <Link to="/pricing" className="mt-4 btn-primary">
              View Plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Order history */}
      <div className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Package className="h-5 w-5 text-primary-600" />
          Order History
        </h2>

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.order_id} className="transition-colors hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {new Date(order.order_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900">
                      ${(order.amount_total / 100).toFixed(2)}{' '}
                      <span className="text-gray-400 uppercase">{order.currency}</span>
                    </td>
                    <td className="py-3">
                      <OrderStatusBadge status={order.order_status} />
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      <span className="capitalize">{order.payment_status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-500">No orders yet.</p>
            <Link to="/pricing" className="mt-4 btn-secondary">
              Browse Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: typeof CheckCircle2; className: string }> = {
    active: { icon: CheckCircle2, className: 'bg-success-50 text-success-700' },
    trialing: { icon: Clock, className: 'bg-primary-50 text-primary-700' },
    past_due: { icon: AlertCircle, className: 'bg-warning-50 text-warning-700' },
    canceled: { icon: XCircle, className: 'bg-error-50 text-error-700' },
    not_started: { icon: Clock, className: 'bg-gray-100 text-gray-600' },
  }
  const c = config[status] || config.not_started
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${c.className}`}>
      <c.icon className="h-3 w-3" />
      {status.replace('_', ' ')}
    </span>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    completed: 'bg-success-50 text-success-700',
    pending: 'bg-warning-50 text-warning-700',
    canceled: 'bg-error-50 text-error-700',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${config[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}
