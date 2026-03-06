'use client';
 
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useCartStore } from '@/store/cartStore'
import { cartService } from '@/services/cartService'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { getErrorMessage } from '@/services/api'
import type { Product } from '@next360/types'
import { formatPrice } from '@/utils/formatPrice'
 
export function useCart() {
  const queryClient = useQueryClient()
  const { items, coupon, isDrawerOpen, setCart, ...actions } = useCartStore()
  const { isAuthenticated } = useAuthStore()
 
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['cart'] })
 
  const addMutation = useMutation({
    mutationFn: ({ productId, quantity, selectedWeight }: { productId: string, quantity: number, selectedWeight: string }) => 
      cartService.addItem(productId, quantity, selectedWeight),
    onSuccess: (data) => {
      setCart(data.items, data.coupon || null)
      invalidate()
      toast.success('Added to cart! 🛒')
    },
    onError: (err) => toast.error(getErrorMessage(err))
  })
 
  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string, quantity: number }) => 
      cartService.updateQty(cartItemId, quantity),
    onSuccess: (data) => {
      setCart(data.items, data.coupon || null)
      invalidate()
    },
    onError: (err) => toast.error(getErrorMessage(err))
  })
 
  const removeMutation = useMutation({
    mutationFn: cartService.removeItem,
    onSuccess: (data) => {
      setCart(data.items, data.coupon || null)
      invalidate()
      toast.success('Removed from cart')
    },
    onError: (err) => toast.error(getErrorMessage(err))
  })
 
  const couponMutation = useMutation({
    mutationFn: cartService.applyCoupon,
    onSuccess: (data) => {
      setCart(data.items, data.coupon || null)
      invalidate()
      toast.success('Coupon applied! 🎉')
    },
    onError: (err) => toast.error(getErrorMessage(err))
  })
 
  const addToCart = (product: Product, quantity: number = 1, selectedWeight: string = product.weight[0]) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart')
      return
    }
    addMutation.mutate({ productId: product.id, quantity, selectedWeight })
    actions.openDrawer()
  }
 
  return {
    items,
    coupon,
    isDrawerOpen,
    subtotal: useCartStore.getState().getSubtotal(),
    total: useCartStore.getState().getTotal(),
    itemCount: useCartStore.getState().getItemCount(),
    formattedSubtotal: formatPrice(useCartStore.getState().getSubtotal()),
    formattedTotal: formatPrice(useCartStore.getState().getTotal()),
    addToCart,
    updateQty: (id: string, qty: number) => updateMutation.mutate({ cartItemId: id, quantity: qty }),
    removeItem: (id: string) => removeMutation.mutate(id),
    applyCoupon: (code: string) => couponMutation.mutate(code),
    removeCoupon: () => cartService.removeCoupon().then((data) => {
      setCart(data.items, null)
      invalidate()
    }),
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
    isApplyingCoupon: couponMutation.isPending,
    ...actions
  }
}
