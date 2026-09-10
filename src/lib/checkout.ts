import { supabase } from '../lib/supabase'

export async function createCheckoutSession(params: {
  priceId: string
  mode: 'payment' | 'subscription'
  successUrl: string
  cancelUrl: string
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('You must be signed in to start a checkout session.')
  }

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        price_id: params.priceId,
        mode: params.mode,
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
      }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to create checkout session')
  }

  return data as { sessionId: string; url: string }
}
