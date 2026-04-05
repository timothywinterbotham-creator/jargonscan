import { Router, Request, Response } from 'express'
import Stripe from 'stripe'
import { prisma } from '../db/client.js'
import { requireAuth, optionalAuth, AuthRequest } from '../middleware/auth.js'
import { runAnalysis } from './scans.js'

const router = Router()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-03-31.basil' as any,
})

const TIER_PRICES: Record<string, number> = {
  basic: 499,
  full: 999,
  'full-dispute': 1499,
}

const TIER_NAMES: Record<string, string> = {
  basic: 'Basic Scan',
  full: 'Full Report',
  'full-dispute': 'Full Report + Dispute',
}

// Create checkout session
router.post('/checkout', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { scanId, tier } = req.body
    if (!scanId || !tier) {
      return res.status(400).json({ message: 'Missing scanId or tier' })
    }

    const amount = TIER_PRICES[tier]
    if (!amount) {
      return res.status(400).json({ message: 'Invalid tier' })
    }

    const scan = await prisma.scan.findUnique({ where: { id: scanId } })
    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' })
    }

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: `JargonScan — ${TIER_NAMES[tier]}`,
              description: `Document scan: ${scan.documentType} (${scan.country})`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        scanId,
        tier,
        userId: req.userId || 'guest',
      },
      success_url: `${clientUrl}/processing/${scanId}`,
      cancel_url: `${clientUrl}/scan`,
    })

    // Store transaction
    await prisma.transaction.create({
      data: {
        userId: req.userId || null,
        scanId,
        amount,
        tier,
        stripeSessionId: session.id,
        status: 'pending',
      },
    })

    return res.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return res.status(500).json({ message: err.message || 'Payment failed' })
  }
})

// Stripe webhook
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event
  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    } else {
      // Dev mode — parse body directly
      event = req.body as Stripe.Event
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ message: 'Webhook error' })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { scanId, tier, userId } = session.metadata || {}

    if (scanId) {
      // Update transaction
      await prisma.transaction.updateMany({
        where: { stripeSessionId: session.id },
        data: {
          status: 'completed',
          stripePaymentId: session.payment_intent as string,
        },
      })

      // Update scan status
      await prisma.scan.update({
        where: { id: scanId },
        data: { status: 'paid', tier: tier || 'basic' },
      })

      // Run analysis asynchronously
      runAnalysis(scanId).catch((err) => {
        console.error('Analysis failed for scan:', scanId, err)
      })
    }
  }

  return res.json({ received: true })
})

// Get credits balance
router.get('/credits', requireAuth, async (req: AuthRequest, res: Response) => {
  const credit = await prisma.credit.findUnique({
    where: { userId: req.userId },
  })
  return res.json({ balance: credit?.balance || 0 })
})

export default router
