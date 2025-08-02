export interface User {
  id: string
  email: string
  name?: string
  credits: number
  planType: 'free' | 'paid'
  createdAt: Date
  updatedAt: Date
}

export interface Statement {
  id: string
  userId: string
  filename: string
  originalFilename: string
  fileUrl: string
  fileSize: number
  fileType: string
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  processingProgress: number
  extractedText?: string
  transactions: Transaction[]
  summary: StatementSummary
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  statementId: string
  date: Date
  description: string
  amount: number
  balance?: number
  type: 'debit' | 'credit' | 'transfer'
  category: string
  confidence: number
  isVerified: boolean
  originalText?: string
}

export interface StatementSummary {
  totalTransactions: number
  totalCredits: number
  totalDebits: number
  openingBalance?: number
  closingBalance?: number
  dateRange: {
    from: Date
    to: Date
  }
}

export interface UploadProgress {
  fileId: string
  filename: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  stage: 'upload' | 'ocr' | 'parsing' | 'complete'
  message?: string
}

export interface ProcessingStep {
  id: string
  name: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  message?: string
  progress: number
}

export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf'
  dateRange?: {
    from: Date
    to: Date
  }
  transactionTypes?: ('debit' | 'credit' | 'transfer')[]
  categories?: string[]
  minAmount?: number
  maxAmount?: number
}
