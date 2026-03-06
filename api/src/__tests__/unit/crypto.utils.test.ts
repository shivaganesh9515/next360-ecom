import { describe, it, expect } from 'vitest'
import * as cryptoUtils from '../../shared/utils/crypto'
import crypto from 'crypto'

describe('Crypto Utils', () => {
  describe('generateOrderNumber', () => {
    it('should follow the format N360-YYYYMMDDXXXX', () => {
      const orderNo = cryptoUtils.generateOrderNumber()
      expect(orderNo).toMatch(/^N360-\d{8}\d{4}$/)
    })
  })

  describe('verifyRazorpaySignature', () => {
    const secret = 'test_secret'
    const orderId = 'rzp_order_123'
    const paymentId = 'pay_123'
    const payload = `${orderId}|${paymentId}`
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')

    it('should return true for valid signature', () => {
      const isValid = cryptoUtils.verifyRazorpaySignature(orderId, paymentId, validSignature, secret)
      expect(isValid).toBe(true)
    })

    it('should return false for tampered signature', () => {
      const isValid = cryptoUtils.verifyRazorpaySignature(orderId, paymentId, 'wrong_sig', secret)
      expect(isValid).toBe(false)
    })
  })

  describe('verifyWebhookSignature', () => {
    const secret = 'webhook_secret'
    const body = JSON.stringify({ event: 'order.paid' })
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    it('should return true for valid webhook signature', () => {
      const isValid = cryptoUtils.verifyWebhookSignature(body, validSignature, secret)
      expect(isValid).toBe(true)
    })
  })
})
