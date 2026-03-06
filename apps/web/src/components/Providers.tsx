"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { Toaster } from "sonner"
import CartSync from "./cart/CartSync"

import FramerLazyProvider from "./providers/FramerLazyProvider"

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <FramerLazyProvider>
        <Toaster position="top-right" richColors closeButton />
        <CartSync />
        {children}
      </FramerLazyProvider>
    </QueryClientProvider>
  )
}
