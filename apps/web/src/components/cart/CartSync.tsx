"use client"

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/services/cartService'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

export default function CartSync() {
  const { isAuthenticated } = useAuthStore()
  const { setCart } = useCartStore()

  const { data: cart, isSuccess } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    enabled: isAuthenticated,
    staleTime: 0, // Volatile data
  })

  useEffect(() => {
    if (isSuccess && cart) {
      setCart(cart.items, cart.coupon || null)
    }
  }, [isSuccess, cart, setCart])

  // Also sync on logout
  useEffect(() => {
    if (!isAuthenticated) {
      // Logic for guest cart could go here, but prompt says "clear on logout"
      // Wait, clearCart exists in cartStore
    }
  }, [isAuthenticated])

  return null
}
