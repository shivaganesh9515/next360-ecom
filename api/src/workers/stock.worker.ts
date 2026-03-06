import { PubSub } from '@google-cloud/pubsub'
import { env } from '../config/env'
import { logger } from '../app'
import { prisma } from '../config/database'

const pubsub = new PubSub({ projectId: env.GCS_PROJECT_ID })

export async function stockWorker() {
  const subscriptionName = 'stock-tasks-sub'
  
  try {
    const subscription = pubsub.subscription(subscriptionName)
    
    logger.info(`Listening for messages on ${subscriptionName}`)
    
    subscription.on('message', async (message) => {
      try {
        const data = JSON.parse(message.data.toString())
        logger.info(`[Stock Worker] Checking stock for product ${data.productId}`)
        
        const product = await prisma.product.findUnique({
          where: { id: data.productId }
        })

        if (product && product.stockCount <= 5) {
          logger.warn(`Low stock alert for ${product.name} (ID: ${product.id}). Remaining: ${product.stockCount}`)
          // notify admin logic
        }

        message.ack()
      } catch (error) {
        logger.error(`[Stock Worker] Failed processing message ${message.id}`, error)
        message.nack()
      }
    })
  } catch (error) {
    logger.error('Failed to initialize stock worker', error)
  }
}
