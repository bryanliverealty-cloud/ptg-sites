import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ArrowRight, Check, Shield, Zap, CreditCard, BarChart3, Lock } from 'lucide-react'

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary-100/40 blur-3xl" />
          <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-accent-100/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Zap className="h-4 w-4" />
              Seamless payments, powered by Stripe
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Payments that just <span className="text-primary-600">work</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Accept one-time payments and subscriptions with beautifully embedded
              Stripe Checkout. No friction, no redirects, no headaches.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to={user ? '/pricing' : '/signup'} className="btn-primary group">
                {user ? 'View Pricing' : 'Get Started Free'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/pricing" className="btn-secondary">
                See Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: CreditCard, title: 'Embedded Checkout', desc: 'Stripe Checkout flows seamlessly within your app. No jarring redirects.' },
            { icon: Shield, title: 'Bank-Grade Security', desc: 'PCI-compliant payment processing handled entirely by Stripe.' },
            { icon: Zap, title: 'Instant Setup', desc: 'Sign up, pick a plan, and start accepting payments in minutes.' },
            { icon: BarChart3, title: 'Real-Time Dashboard', desc: 'Track subscriptions, orders, and payment status as they happen.' },
            { icon: Lock, title: 'Secure Auth', desc: 'User accounts protected by Supabase authentication.' },
            { icon: Check, title: 'Subscriptions & One-Time', desc: 'Support both recurring subscriptions and single purchases.' },
          ].map((f) => (
            <div
              key={f.title}
              className="card group p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
               <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-16 text-center shadow-2xl sm:px-12">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[200px] w-[200px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-[200px] w-[200px] rounded-full bg-accent-400/20 blur-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to start accepting payments?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-100">
            Create your account today and connect Stripe in minutes.
          </p>
          <Link
            to={user ? '/pricing' : '/signup'}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl active:scale-[0.98]"
          >
            {user ? 'View Pricing Plans' : 'Create Free Account'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
