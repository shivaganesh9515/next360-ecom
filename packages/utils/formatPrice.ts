// All prices stored in paise (₹1 = 100 paise)
export function formatPrice(paise: number): string {
  const rupees = paise / 100
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees)
}

export function formatPriceRaw(paise: number): number {
  return paise / 100
}

export function toRupees(paise: number): number {
  return paise / 100
}

export function toPaise(rupees: number): number {
  return Math.round(rupees * 100)
}
