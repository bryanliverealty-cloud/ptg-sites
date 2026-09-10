import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'


export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [verifying, setVerifying] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVerifying(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (verifying) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 animate-fade-in">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary-500" />
          <h1 className="mt-6 text-xl font-semibold text-gray-900">Confirming your payment...</h1>
          <p className="mt-2 text-sm text-gray-600">This will only take a moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md text-center animate-scale-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100">
          <CheckCircle2 className="h-10 w-10 text-success-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Payment successful!</h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Your payment has been processed and your account
          has been updated.
        </p>
        {sessionId && (
          <p className="mt-3 text-xs text-gray-400">
            Session: {sessionId.slice(0, 20)}...
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/dashboard" className="btn-primary group">
            Go to Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/pricing" className="btn-secondary">
            View More Plans
          </Link>
        </div>
      </div>
    </div>
  )
}
