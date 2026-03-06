import { Router } from 'express'
import * as webhooksController from './webhooks.controller'

const router = Router()

// Notice we do NOT parse JSON here at router level because we need raw body for signature verification
// the main app.ts should use express.raw for this route instead.
router.post('/razorpay', webhooksController.handleRazorpayWebhook)

export default router
