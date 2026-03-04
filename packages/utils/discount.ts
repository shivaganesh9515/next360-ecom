export function calculateDiscountPercent(
  originalPaise: number,
  currentPaise: number
): number {
  if (originalPaise <= currentPaise) return 0
  return Math.round(((originalPaise - currentPaise) / originalPaise) * 100)
}

export function calculateDeliveryFee(subtotalPaise: number): number {
  const FREE_DELIVERY_THRESHOLD = 49900 // ₹499
  const DELIVERY_FEE = 4900              // ₹49
  return subtotalPaise >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
}

export function applyCoupon(
  subtotalPaise: number,
  couponType: 'PERCENT' | 'FLAT',
  couponValue: number
): number {
  if (couponType === 'PERCENT') {
    return Math.round(subtotalPaise * (couponValue / 100))
  }
  return Math.min(toPaise(couponValue), subtotalPaise)
}

function toPaise(rupees: number): number {
  return Math.round(rupees * 100)
}
