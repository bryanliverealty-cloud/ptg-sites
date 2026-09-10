import { Link } from 'react-router-dom'
import { XCircle, ArrowRight } from 'lucide-react'

export default function CancelPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md text-center animate-scale-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-error-100">
          <XCircle className="h-10 w-10 text-error-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout cancelled</h1>
        <p className="mt-4 text-gray-600">
          Your checkout was cancelled and no payment was processed. You can try again
          whenever you're ready.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/pricing" className="btn-primary group">
            Back to Pricing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/dashboard" className="btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
