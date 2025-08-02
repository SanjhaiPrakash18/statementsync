import { NextRequest, NextResponse } from 'next/server'
import { getDodoPayments } from '@/lib/dodo-payments'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('webhook-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature' }, { status: 400 })
    }

    // Verify webhook signature
    const dodoPayments = getDodoPayments()
    const isValid = dodoPayments.verifyWebhookSignature(body, signature)

    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    
    // Handle different webhook events
    switch (event.type) {
      case 'payment.succeeded':
        await handlePaymentSucceeded(event.data)
        break
      
      case 'payment.failed':
        await handlePaymentFailed(event.data)
        break
      
      case 'subscription.created':
        await handleSubscriptionCreated(event.data)
        break
      
      case 'subscription.renewed':
        await handleSubscriptionRenewed(event.data)
        break
      
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.data)
        break
      
      case 'refund.processed':
        await handleRefundProcessed(event.data)
        break
      
      default:
        console.log(`Unhandled webhook event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSucceeded(paymentData: any) {
  console.log('Payment succeeded:', paymentData)
  
  // Here you would typically:
  // 1. Update user's subscription status in your database
  // 2. Send confirmation email
  // 3. Provision access to paid features
  
  try {
    // Example: Update user subscription
    // await updateUserSubscription(paymentData.customer.email, {
    //   plan: paymentData.metadata.plan,
    //   status: 'active',
    //   paymentId: paymentData.id,
    //   startDate: new Date(),
    //   endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    // })
    
    console.log(`Payment ${paymentData.id} processed successfully`)
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(paymentData: any) {
  console.log('Payment failed:', paymentData)
  
  // Here you would typically:
  // 1. Log the failure
  // 2. Send failure notification to user
  // 3. Update subscription status if applicable
  
  try {
    console.log(`Payment ${paymentData.id} failed: ${paymentData.failure_reason}`)
  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

async function handleSubscriptionCreated(subscriptionData: any) {
  console.log('Subscription created:', subscriptionData)
  
  // Handle new subscription creation
  try {
    console.log(`Subscription ${subscriptionData.id} created for customer ${subscriptionData.customer.email}`)
  } catch (error) {
    console.error('Error handling subscription creation:', error)
  }
}

async function handleSubscriptionRenewed(subscriptionData: any) {
  console.log('Subscription renewed:', subscriptionData)
  
  // Handle subscription renewal
  try {
    // Extend user's access period
    console.log(`Subscription ${subscriptionData.id} renewed`)
  } catch (error) {
    console.error('Error handling subscription renewal:', error)
  }
}

async function handleSubscriptionCancelled(subscriptionData: any) {
  console.log('Subscription cancelled:', subscriptionData)
  
  // Handle subscription cancellation
  try {
    // Update user's access to reflect cancellation
    console.log(`Subscription ${subscriptionData.id} cancelled`)
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handleRefundProcessed(refundData: any) {
  console.log('Refund processed:', refundData)
  
  // Handle refund processing
  try {
    console.log(`Refund ${refundData.id} processed for payment ${refundData.payment_id}`)
  } catch (error) {
    console.error('Error handling refund:', error)
  }
}