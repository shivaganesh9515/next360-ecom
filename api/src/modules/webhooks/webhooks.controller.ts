import { Request, Response, NextFunction } from 'express'
import { verifyWebhookSignature } from '../../shared/utils/crypto'
import { env } from '../../config/env'
import { prisma } from '../../config/database'
import { logger } from '../../app'

export async function handleRazorpayWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const signature = req.headers['x-razorpay-signature'] as string
    if (!signature) return res.status(400).send('No signature')

    // verify webhook signature
    // requires req.body to be a raw Buffer or String. We assume body-parser raw was used.
    const bodyStr = req.body.toString('utf8')
    const isValid = verifyWebhookSignature(bodyStr, signature, env.RAZORPAY_WEBHOOK_SECRET)
    
    if (!isValid) {
      logger.error('Invalid Razorpay Webhook Signature')
      return res.status(400).send('Invalid signature')
    }

    const payload = JSON.parse(bodyStr)
    const event = payload.event

    logger.info(`Received Webhook: ${event}`)

    if (event === 'payment.captured') {
      const orderId = payload.payload.payment.entity.order_id
      if (orderId) {
        const order = await prisma.order.findFirst({ where: { paymentId: orderId } })
        if (order && order.status === 'PENDING') {
          await prisma.$transaction([
            prisma.order.update({
              where: { id: order.id },
              data: { status: 'CONFIRMED' }
            }),
            prisma.orderTracking.create({
              data: { orderId: order.id, status: 'CONFIRMED', message: 'Payment confirmed via webhook' }
            })
          ])
          // TODO publish success event
        }
      }
    } else if (event === 'payment.failed') {
      // Handle failed payment if necessary
    }

    res.status(200).send('OK')
  } catch (error) {
    logger.error('Webhook error', error)
    res.status(500).send('Error handling webhook')
  }
}
