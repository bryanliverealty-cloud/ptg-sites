import { useState } from 'react'
import { createCheckoutSession } from '../lib/checkout'
import { Check, Loader2, Sparkles, Zap, Crown, AlertCircle } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  priceId: string
  mode: 'payment' | 'subscription'
  highlighted?: boolean
  icon: typeof Zap
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: 'one-time',
    description: 'Perfect for getting your project off the ground.',
    features: [
      '1 project license',
      'Standard support',
      'Core features included',
      'Email notifications',
      'Community access',
    ],
    priceId: 'price_starter_one_time',
    mode: 'payment',
    icon: Zap,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Everything you need to grow your business.',
    features: [
      'Unlimited projects',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
      'Team collaboration',
      'API access',
      'White-label options',
    ],
    priceId: 'price_pro_monthly',
    mode: 'subscription',
    highlighted: true,
    icon: Crown,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'Built for scale and demanding workloads.',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom onboarding',
      'Advanced security',
      'SSO & SAML',
      'Audit logs',
    ],
    priceId: 'price_enterprise_monthly',
    mode: 'subscription',
    icon: Sparkles,
  },
]

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubscribe(plan: Plan) {
    setError(null)
    setLoadingPlan(plan.id)
    try {
      const result = await createCheckoutSession({
        priceId: plan.priceId,
        mode: plan.mode,
        successUrl: `${window.location.origin}/ptg/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/ptg/cancel`,
      })
      if (result.url) {
        window.location.href = result.url
      }
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout. Please try again.')
      setLoadingPlan(null)
    }
  }

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
            <Sparkles className="h-4 w-4" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Choose your plan
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Start with a one-time purchase or subscribe for ongoing access. Cancel anytime.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {error && (
          <div className="mx-auto mb-8 flex max-w-2xl items-center gap-3 rounded-xl border border-error-200 bg-error-50 px-5 py-4 text-sm text-error-700 animate-slide-up">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative flex flex-col p-8 transition-all duration-200 hover:shadow-lg ${
                plan.highlighted
                  ? 'ring-2 ring-primary-500 shadow-lg lg:scale-105'
                  : 'hover:-translate-y-0.5'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    plan.highlighted ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600'
                  }`}
                >
                  <plan.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              </div>

              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-sm font-medium text-gray-500">{plan.period}</span>
              </div>
              <p className="mb-6 text-sm text-gray-600">{plan.description}</p>

              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlan !== null}
                className={plan.highlighted ? 'btn-primary w-full' : 'btn-secondary w-full'}
              >
                {loadingPlan === plan.id ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecting to checkout...
                  </>
                ) : plan.mode === 'subscription' ? (
                  'Subscribe Now'
                ) : (
                  'Buy Now'
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Secure payment processing</h3>
          <p className="mt-2 text-sm text-gray-600">
            All payments are securely processed by Stripe. We never touch your card details.
            You'll be redirected to Stripe's encrypted checkout to complete your purchase.
          </p>
        </div>
      </section>
    </div>
  )
}
