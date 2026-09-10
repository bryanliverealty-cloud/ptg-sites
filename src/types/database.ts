export interface Database {
  stripe_customers: {
    Row: {
      id: number
      user_id: string
      customer_id: string
      created_at: string
      updated_at: string
      deleted_at: string | null
    }
  }
  stripe_subscriptions: {
    Row: {
      id: number
      customer_id: string
      subscription_id: string | null
      price_id: string | null
      current_period_start: number | null
      current_period_end: number | null
      cancel_at_period_end: boolean
      payment_method_brand: string | null
      payment_method_last4: string | null
      status: string
      created_at: string
      updated_at: string
      deleted_at: string | null
    }
  }
  stripe_orders: {
    Row: {
      id: number
      checkout_session_id: string
      payment_intent_id: string
      customer_id: string
      amount_subtotal: number
      amount_total: number
      currency: string
      payment_status: string
      status: string
      created_at: string
      updated_at: string
      deleted_at: string | null
    }
  }
  stripe_user_subscriptions: {
    Row: {
      customer_id: string
      subscription_id: string | null
      subscription_status: string
      price_id: string | null
      current_period_start: number | null
      current_period_end: number | null
      cancel_at_period_end: boolean
      payment_method_brand: string | null
      payment_method_last4: string | null
    }
  }
  stripe_user_orders: {
    Row: {
      customer_id: string
      order_id: number
      checkout_session_id: string
      payment_intent_id: string
      amount_subtotal: number
      amount_total: number
      currency: string
      payment_status: string
      order_status: string
      order_date: string
    }
  }
}
