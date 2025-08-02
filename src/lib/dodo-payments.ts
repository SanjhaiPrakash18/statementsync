// Dodo Payments Integration
// Based on the API documentation from https://docs.dodopayments.com

export interface DodoPaymentConfig {
  apiKey: string
  secretKey: string
  mode: 'test' | 'live'
}

export interface PaymentItem {
  name: string
  description?: string
  amount: number // in cents
  currency: string
  quantity: number
}

export interface Customer {
  email: string
  name?: string
  phone?: string
  address?: {
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
}

export interface CreatePaymentRequest {
  items: PaymentItem[]
  customer: Customer
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, any>
}

export interface PaymentResponse {
  id: string
  status: 'pending' | 'successful' | 'failed' | 'cancelled'
  checkout_url: string
  amount: number
  currency: string
  created_at: string
}

class DodoPayments {
  private apiKey: string
  private secretKey: string
  private baseUrl: string

  constructor(config: DodoPaymentConfig) {
    this.apiKey = config.apiKey
    this.secretKey = config.secretKey
    this.baseUrl = config.mode === 'live' 
      ? 'https://api.dodopayments.com/v1' 
      : 'https://api-sandbox.dodopayments.com/v1'
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  async createPayment(request: CreatePaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          items: request.items,
          customer: request.customer,
          success_url: request.successUrl,
          cancel_url: request.cancelUrl,
          metadata: request.metadata
        })
      })

      if (!response.ok) {
        throw new Error(`Payment creation failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error creating payment:', error)
      throw error
    }
  }

  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
        method: 'GET',
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Failed to get payment: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error getting payment:', error)
      throw error
    }
  }

  async refundPayment(paymentId: string, amount?: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          amount: amount // If not provided, full refund
        })
      })

      if (!response.ok) {
        throw new Error(`Refund failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error refunding payment:', error)
      throw error
    }
  }

  // Webhook signature verification
  verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const crypto = require('crypto')
      const expectedSignature = crypto
        .createHmac('sha256', this.secretKey)
        .update(payload)
        .digest('hex')
      
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
      )
    } catch (error) {
      console.error('Error verifying webhook signature:', error)
      return false
    }
  }
}

// Singleton instance
let dodoPayments: DodoPayments | null = null

export function initializeDodoPayments(config: DodoPaymentConfig): DodoPayments {
  dodoPayments = new DodoPayments(config)
  return dodoPayments
}

export function getDodoPayments(): DodoPayments {
  if (!dodoPayments) {
    throw new Error('Dodo Payments not initialized. Call initializeDodoPayments first.')
  }
  return dodoPayments
}

export { DodoPayments }