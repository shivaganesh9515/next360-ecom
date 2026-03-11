'use client'

import { useEffect } from 'react'
import { Button } from '@next360/ui'
import { AlertCircle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-border p-12 text-center shadow-xl shadow-primary/5">
        <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-8 border border-red-100">
          <AlertCircle size={40} />
        </div>
        
        <h2 className="font-display text-3xl font-bold text-primary mb-4">Something went wrong</h2>
        <p className="text-muted font-medium mb-12 leading-relaxed">
          We encountered an error while processing your checkout. Please try again or contact support if the issue persists.
        </p>

        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => reset()}
            className="h-14 rounded-2xl font-black text-lg w-full flex items-center justify-center gap-2"
          >
            <RefreshCcw size={20} />
            Try Again
          </Button>
          
          <Link href="/">
            <Button 
              variant="outline"
              className="h-14 rounded-2xl font-bold text-muted w-full flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
