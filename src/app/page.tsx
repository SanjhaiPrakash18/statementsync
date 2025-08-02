'use client'

import { useState } from 'react'
import { FileUploader } from '@/components/upload/FileUploader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, FileText, Zap, Shield, Download, CheckCircle, Clock, Star } from 'lucide-react'
import { UploadProgress } from '@/types'

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
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Lightning Fast OCR",
      description: "Advanced AI extracts data from your statements in under 2 minutes"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Bank-Grade Security",
      description: "Your financial data is encrypted and automatically deleted after processing"
    },
    {
      icon: <Download className="h-6 w-6 text-purple-600" />,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">StatementSync</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Bank Statements to{' '}
              <span className="gradient-text">Excel in Seconds</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Upload your PDF, JPG, or PNG bank statements and get clean, formatted Excel files instantly. 
              No more manual data entry.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4">
                  <CardContent className="p-0 text-center">
                    <div className="flex items-center justify-center mb-2 text-blue-600">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* File Upload Section */}
            <Card className="max-w-3xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Upload Bank Statements</h3>
                  <p className="text-gray-600">
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

                <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Bank-grade security</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>2-minute processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>99% accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose StatementSync?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to transform your statements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
              <p className="text-gray-600">Upload your PDF, JPG, or PNG bank statements</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Process</h3>
              <p className="text-gray-600">AI extracts and organizes your transaction data</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download</h3>
              <p className="text-gray-600">Get your clean, formatted Excel file instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">StatementSync</span>
              </div>
              <p className="text-gray-400">
                Transform your bank statements to Excel format with AI-powered precision.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
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
