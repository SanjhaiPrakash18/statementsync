import { NextRequest, NextResponse } from 'next/server'
import { initializeDodoPayments, CreatePaymentRequest } from '@/lib/dodo-payments'

// Initialize Dodo Payments (in production, use environment variables)
const dodoPayments = initializeDodoPayments({
  apiKey: process.env.DODO_PAYMENTS_API_KEY || 'test_api_key',
  secretKey: process.env.DODO_PAYMENTS_SECRET_KEY || 'test_secret_key',
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'test'
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planName, customerEmail, customerName } = body

    // Define pricing plans
    const plans = {
      starter: { price: 0, name: 'Starter Plan' },
      professional: { price: 1900, name: 'Professional Plan' }, // $19.00 in cents
      enterprise: { price: 9900, name: 'Enterprise Plan' } // $99.00 in cents
    }

    const selectedPlan = plans[planName as keyof typeof plans]
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 })
    }

    // For free plans, return success without payment
    if (selectedPlan.price === 0) {
      return NextResponse.json({
        success: true,
        message: 'Free plan activated successfully',
        plan: selectedPlan.name
      })
    }

    // Create payment request
    const paymentRequest: CreatePaymentRequest = {
      items: [{
        name: selectedPlan.name,
        description: `Monthly subscription to ${selectedPlan.name}`,
        amount: selectedPlan.price,
        currency: 'USD',
        quantity: 1
      }],
      customer: {
        email: customerEmail,
        name: customerName
      },
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancel`,
      metadata: {
        plan: planName,
        subscription: true
      }
    }

    const payment = await dodoPayments.createPayment(paymentRequest)

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      checkoutUrl: payment.checkout_url,
      amount: payment.amount,
      currency: payment.currency
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('paymentId')

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
    }

    const payment = await dodoPayments.getPayment(paymentId)

    return NextResponse.json({
      success: true,
      payment
    })

  } catch (error) {
    console.error('Payment retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}