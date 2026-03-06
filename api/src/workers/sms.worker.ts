import { PubSub } from '@google-cloud/pubsub'
import { env } from '../config/env'
import { logger } from '../app'

const pubsub = new PubSub({ projectId: env.GCS_PROJECT_ID })

export async function smsWorker() {
  const subscriptionName = 'sms-tasks-sub'
  
  try {
    const subscription = pubsub.subscription(subscriptionName)
    
    logger.info(`Listening for messages on ${subscriptionName}`)
    
    subscription.on('message', async (message) => {
      try {
        const data = JSON.parse(message.data.toString())
        logger.info(`[SMS Worker] Processing SMS for ${data.phone}`)
        
        // TODO: integrate MSG91 here
        
        message.ack()
      } catch (error) {
        logger.error(`[SMS Worker] Failed processing message ${message.id}`, error)
        message.nack()
      }
    })
  } catch (error) {
    logger.error('Failed to initialize sms worker', error)
  }
}
