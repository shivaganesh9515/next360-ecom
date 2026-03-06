import { PubSub } from '@google-cloud/pubsub'
import { env } from '../config/env'
import { logger } from '../app'

const pubsub = new PubSub({ projectId: env.GCS_PROJECT_ID })

export async function emailWorker() {
  const subscriptionName = 'email-tasks-sub'
  
  try {
    const subscription = pubsub.subscription(subscriptionName)
    
    logger.info(`Listening for messages on ${subscriptionName}`)
    
    subscription.on('message', async (message) => {
      try {
        const data = JSON.parse(message.data.toString())
        logger.info(`[Email Worker] Processing email for ${data.to}`)
        
        // TODO: integrate Resend or Nodemailer here
        
        message.ack()
      } catch (error) {
        logger.error(`[Email Worker] Failed processing message ${message.id}`, error)
        message.nack()
      }
    })
    
    subscription.on('error', (error) => {
      logger.error(`[Email Worker] Subscription error:`, error)
    })
  } catch (error) {
    logger.error('Failed to initialize email worker', error)
  }
}
