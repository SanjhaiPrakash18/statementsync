'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Upload, Zap, Shield, Download, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUploader } from '@/components/upload/FileUploader'
import { ProcessingStatus } from '@/components/processing/ProcessingStatus'
import { ProcessingStep } from '@/types'

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const processingSteps: ProcessingStep[] = [
    { id: '1', name: 'Uploading File', status: 'pending', progress: 0 },
    { id: '2', name: 'Extracting Text (OCR)', status: 'pending', progress: 0, message: 'Using Google Vision API' },
    { id: '3', name: 'Parsing Transactions', status: 'pending', progress: 0, message: 'AI-powered data extraction' },
    { id: '4', name: 'Generating Export', status: 'pending', progress: 0, message: 'Creating Excel file' }
  ]

  const [steps, setSteps] = useState<ProcessingStep[]>(processingSteps)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(prev => [...prev, ...selectedFiles])
    
    if (selectedFiles.length > 0 && !isProcessing) {
      startDemoProcessing(selectedFiles[0])
    }
  }

  const startDemoProcessing = (file: File) => {
    setIsProcessing(true)
    setProcessingProgress(0)
    setCurrentStep(0)
    
    const newSteps = [...processingSteps]
    setSteps(newSteps)

    const intervals = [
      setTimeout(() => {
        newSteps[0] = { ...newSteps[0], status: 'processing', message: `Uploading ${file.name}` }
        setSteps([...newSteps])
        setProcessingProgress(10)
      }, 500),

      setTimeout(() => {
        newSteps[0] = { ...newSteps[0], status: 'completed', progress: 100 }
        newSteps[1] = { ...newSteps[1], status: 'processing', message: 'Extracting text from PDF...' }
        setSteps([...newSteps])
        setCurrentStep(1)
        setProcessingProgress(30)
      }, 2000),

      setTimeout(() => {
        newSteps[1] = { ...newSteps[1], progress: 60, message: 'Analyzing document structure...' }
        setSteps([...newSteps])
        setProcessingProgress(50)
      }, 4000),

      setTimeout(() => {
        newSteps[1] = { ...newSteps[1], status: 'completed', progress: 100 }
        newSteps[2] = { ...newSteps[2], status: 'processing', message: 'Identifying transactions...' }
        setSteps([...newSteps])
        setCurrentStep(2)
        setProcessingProgress(70)
      }, 6000),

      setTimeout(() => {
        newSteps[2] = { ...newSteps[2], progress: 80, message: 'Extracting dates, amounts, descriptions...' }
        setSteps([...newSteps])
        setProcessingProgress(85)
      }, 8000),

      setTimeout(() => {
        newSteps[2] = { ...newSteps[2], status: 'completed', progress: 100 }
        newSteps[3] = { ...newSteps[3], status: 'processing', message: 'Creating Excel file...' }
        setSteps([...newSteps])
        setCurrentStep(3)
        setProcessingProgress(95)
      }, 10000),

      setTimeout(() => {
        newSteps[3] = { ...newSteps[3], status: 'completed', progress: 100 }
        setSteps([...newSteps])
        setProcessingProgress(100)
        setIsProcessing(false)
      }, 12000)
    ]

    return () => intervals.forEach(clearTimeout)
  }

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Lightning Fast OCR",
      description: "Advanced AI extracts data from your statements in under 2 minutes"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Bank-Grade Security",
      description: "Your financial data is encrypted and automatically deleted after processing"
    },
    {
      icon: <Download className="h-8 w-8 text-purple-500" />,
      title: "Multiple Formats",
      description: "Download as Excel, CSV, or PDF with clean, organized transaction data"
    }
  ]

  const pricingPlans = [
    {
      name: "Free Trial",
      price: "₹0",
      description: "Perfect for trying out the service",
      features: ["1 free statement", "Basic OCR", "CSV export", "Email support"],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pay Per Use",
      price: "₹10",
      description: "Per statement processed",
      features: ["Unlimited statements", "Advanced AI parsing", "All export formats", "Priority support"],
      buttonText: "Process Now",
      popular: true
    },
    {
      name: "Credit Pack",
      price: "₹100",
      description: "12 statements (₹8.33 each)",
      features: ["Bulk processing", "Advanced AI parsing", "All export formats", "Priority support"],
      buttonText: "Buy Credits",
      popular: false
    }
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">StatementSync</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Bank Statements to{' '}
            <span className="gradient-text">Excel in Seconds</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your PDF, JPG, or PNG bank statements and get clean, formatted Excel files instantly. 
            No more manual data entry.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            {!isProcessing ? (
              <FileUploader
                onFilesSelected={handleFilesSelected}
                maxFiles={3}
                className="animate-fade-in"
                disabled={isProcessing}
              />
            ) : (
              <ProcessingStatus
                filename={files[0]?.name || 'bank-statement.pdf'}
                currentStep={currentStep}
                progress={processingProgress}
                steps={steps}
                className="animate-fade-in"
              />
            )}
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>2-minute processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>99% accuracy</span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose StatementSync?</h2>
            <p className="text-xl text-gray-600">Powerful features designed for accuracy and speed</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Pay only for what you use. No hidden fees.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">StatementSync</span>
              </div>
              <p className="text-gray-400">
                Transform your bank statements into clean Excel files with AI-powered accuracy.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StatementSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
