'use client'

import { useState } from 'react'
import { FileUploader } from '@/components/upload/FileUploader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, FileText, Zap, Shield, Download, CheckCircle, Clock, Star } from 'lucide-react'
import { UploadProgress } from '@/types'
import { Logo } from '@/components/Logo'

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files)
    // Mock upload progress for demonstration
    const mockProgress = files.map((file, index) => ({
      fileId: `file-${index}`,
      filename: file.name,
      progress: 0,
      status: 'uploading' as const,
      stage: 'upload' as const,
      message: 'Starting upload...'
    }))
    setUploadProgress(mockProgress)
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-foreground" />,
      title: "Lightning Fast OCR",
      description: "Advanced AI extracts data from your statements in under 2 minutes"
    },
    {
      icon: <Shield className="h-6 w-6 text-foreground" />,
      title: "Bank-Grade Security",
      description: "Your financial data is encrypted and automatically deleted after processing"
    },
    {
      icon: <Download className="h-6 w-6 text-foreground" />,
      title: "Multiple Formats",
      description: "Download as Excel, CSV, or PDF with clean, organized transaction data"
    }
  ]

  const stats = [
    { icon: <FileText className="h-5 w-5" />, label: "Files Processed", value: "50,000+" },
    { icon: <Clock className="h-5 w-5" />, label: "Avg Process Time", value: "2 minutes" },
    { icon: <Star className="h-5 w-5" />, label: "Accuracy Rate", value: "99%" },
    { icon: <CheckCircle className="h-5 w-5" />, label: "Happy Users", value: "10,000+" }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" variant="default" />
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Transform Bank Statements to{' '}
              <span className="gradient-text">Excel in Seconds</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your PDF, JPG, or PNG bank statements and get clean, formatted Excel files instantly. 
              No more manual data entry.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 text-center">
                    <div className="flex items-center justify-center mb-2 text-foreground">
                      {stat.icon}
                    </div>
                                          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* File Upload Section */}
            <Card className="max-w-3xl mx-auto shadow-xl border-0 bg-card/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                                  <h3 className="text-2xl font-semibold text-foreground mb-2">Upload Bank Statements</h3>
                <p className="text-muted-foreground">
                    Drag & drop your files here, or click to browse
                  </p>
                </div>
                
                <FileUploader
                  onFilesSelected={handleFilesSelected}
                  maxFiles={5}
                  maxSizeMB={10}
                  uploadProgress={uploadProgress}
                  disabled={isProcessing}
                  className="w-full"
                />

                <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                    <span>Bank-grade security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                    <span>2-minute processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                    <span>99% accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose StatementSync?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for accuracy and speed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple 3-step process to transform your statements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
              <p className="text-muted-foreground">Upload your PDF, JPG, or PNG bank statements</p>
            </div>
            
            <div className="text-center">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Process</h3>
              <p className="text-muted-foreground">AI extracts and organizes your transaction data</p>
            </div>
            
            <div className="text-center">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download</h3>
              <p className="text-muted-foreground">Get your clean, formatted Excel file instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="md" variant="inverted" showText={false} />
                <span className="text-xl font-bold">StatementSync</span>
              </div>
              <p className="text-muted-foreground">
                Transform your bank statements to Excel format with AI-powered precision.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 StatementSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
