export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))
}

export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode)
}

export function isValidGSTIN(gstin: string): boolean {
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidIFSC(ifsc: string): boolean {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)
}
