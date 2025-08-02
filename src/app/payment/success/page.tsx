'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const paymentId = searchParams.get('payment_id')
    const sessionId = searchParams.get('session_id')
    
    if (paymentId || sessionId) {
      // Fetch payment details
      fetchPaymentDetails(paymentId || sessionId)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchPaymentDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/payments?paymentId=${id}`)
      if (response.ok) {
        const data = await response.json()
        setPaymentDetails(data.payment)
      }
    } catch (error) {
      console.error('Error fetching payment details:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">StatementSync</span>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {loading ? (
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading payment details...</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-foreground" />
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-foreground mb-4">
                    Payment Successful!
                  </h1>
                  
                  <p className="text-xl text-muted-foreground mb-6">
                    Thank you for your purchase. Your subscription has been activated.
                  </p>

                  {paymentDetails && (
                    <div className="bg-muted/30 rounded-lg p-6 mb-6 text-left">
                      <h3 className="font-semibold text-foreground mb-4">Payment Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment ID:</span>
                          <span className="text-foreground font-mono">{paymentDetails.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="text-foreground">${(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency?.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="text-foreground capitalize">{paymentDetails.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="text-foreground">
                            {new Date(paymentDetails.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">What's Next?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 text-left">
                        <li>• You'll receive a confirmation email shortly</li>
                        <li>• Access to your plan features is now active</li>
                        <li>• You can start uploading bank statements immediately</li>
                        <li>• Check your dashboard for usage limits and features</li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/">
                        <Button className="w-full sm:w-auto">
                          Start Using StatementSync
                        </Button>
                      </Link>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full sm:w-auto">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@statementsync.com" className="text-foreground underline">
              support@statementsync.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}