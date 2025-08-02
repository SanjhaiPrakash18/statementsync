'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'

interface PricingCardProps {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  popular: boolean
  planId: string
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  popular,
  planId
}: PricingCardProps) {
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    if (planId === 'starter') {
      // Free plan - no payment needed
      alert('Free plan activated! You can now upload up to 5 statements per month.')
      return
    }

    setLoading(true)
    
    try {
      // In a real app, you'd collect user info first
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: planId,
          customerEmail: 'user@example.com', // This should come from user input
          customerName: 'John Doe' // This should come from user input
        })
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to Dodo Payments checkout
        window.location.href = data.checkoutUrl
      } else {
        throw new Error(data.error || 'Payment creation failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`relative p-6 ${popular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <CardContent className="p-0">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <div className="mb-2">
            <span className="text-4xl font-bold text-foreground">{price}</span>
            {period && <span className="text-muted-foreground">{period}</span>}
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-foreground flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${popular ? 'bg-primary text-primary-foreground' : ''}`}
          variant={popular ? 'default' : 'outline'}
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </CardContent>
    </Card>
  )
}