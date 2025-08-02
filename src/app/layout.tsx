import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StatementSync - Transform Bank Statements to Excel',
  description: 'Convert your bank statements to Excel format with AI-powered OCR. Upload PDF, JPG, or PNG files and get clean, formatted spreadsheets instantly.',
  keywords: ['bank statement', 'excel', 'PDF to Excel', 'OCR', 'statement conversion', 'finance'],
  authors: [{ name: 'StatementSync Team' }],
  creator: 'StatementSync',
  publisher: 'StatementSync',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://statementsync.com',
    title: 'StatementSync - Transform Bank Statements to Excel',
    description: 'Convert your bank statements to Excel format with AI-powered OCR.',
    siteName: 'StatementSync',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StatementSync - Transform Bank Statements to Excel',
    description: 'Convert your bank statements to Excel format with AI-powered OCR.',
    creator: '@statementsync',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
