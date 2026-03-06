import { PubSub } from '@google-cloud/pubsub'
import { env } from '../config/env'
import { logger } from '../app'
import { prisma } from '../config/database'

const pubsub = new PubSub({ projectId: env.GCS_PROJECT_ID })

export async function seedsWorker() {
  const subscriptionName = 'seeds-tasks-sub'
  
  try {
    const subscription = pubsub.subscription(subscriptionName)
    
    logger.info(`Listening for messages on ${subscriptionName}`)
    
    subscription.on('message', async (message) => {
      try {
        const data = JSON.parse(message.data.toString())
        logger.info(`[Seeds Worker] Processing seeds for user ${data.userId}`)
        
        await prisma.$transaction([
          prisma.user.update({
            where: { id: data.userId },
            data: { seeds: { increment: data.amount } }
          }),
          prisma.seedsTransaction.create({
            data: {
              userId: data.userId,
              amount: data.amount,
              action: data.action || 'Earned via order'
            }
          })
        ])
        
        message.ack()
      } catch (error) {
        logger.error(`[Seeds Worker] Failed processing message ${message.id}`, error)
        message.nack()
      }
    })
  } catch (error) {
    logger.error('Failed to initialize seeds worker', error)
  }
}
