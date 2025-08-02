'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, FileText, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancel() {
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

      {/* Cancel Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center">
                    <XCircle className="h-12 w-12 text-muted-foreground" />
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Payment Cancelled
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6">
                  Your payment was cancelled. No charges have been made to your account.
                </p>

                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">What happened?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 text-left">
                      <li>• You chose to cancel the payment process</li>
                      <li>• No charges were made to your payment method</li>
                      <li>• Your account remains unchanged</li>
                      <li>• You can try again at any time</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Still want to subscribe?</h4>
                    <p className="text-sm text-muted-foreground mb-3 text-left">
                      You can continue with our free plan or try the payment process again.
                      Our premium plans offer advanced features and higher processing limits.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/#pricing">
                      <Button className="w-full sm:w-auto">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Continue with Free Plan
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-8 p-4 bg-muted/20 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2">Need Help?</h5>
                    <p className="text-sm text-muted-foreground">
                      If you encountered any issues during the payment process, please don't hesitate to contact our support team.
                    </p>
                    <div className="mt-3">
                      <a 
                        href="mailto:support@statementsync.com" 
                        className="text-foreground underline text-sm"
                      >
                        support@statementsync.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-foreground py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Questions about our pricing?{' '}
            <Link href="/#pricing" className="text-foreground underline">
              View our plans
            </Link>
            {' '}or{' '}
            <a href="mailto:support@statementsync.com" className="text-foreground underline">
              contact support
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}