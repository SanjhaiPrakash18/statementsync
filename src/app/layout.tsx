import type { Metadata } from 'next'
import { Rethink_Sans } from 'next/font/google'
import './globals.css'

const rethinkSans = Rethink_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-rethink-sans'
})

export const metadata: Metadata = {
  title: 'StatementSync - Transform Bank Statements to Excel',
  description: 'Convert your bank statements to Excel format with AI-powered OCR. Upload PDF, JPG, or PNG files and get clean, formatted spreadsheets instantly.',
  keywords: ['bank statement', 'excel', 'PDF to Excel', 'OCR', 'statement conversion', 'finance'],
  authors: [{ name: 'StatementSync Team' }],
  creator: 'StatementSync',
  publisher: 'StatementSync',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml', sizes: '32x32' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: '120x120' }
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://statementsync.com',
    title: 'StatementSync - Transform Bank Statements to Excel',
    description: 'Convert your bank statements to Excel format with AI-powered OCR.',
    siteName: 'StatementSync',
    images: [
      {
        url: '/logo.svg',
        width: 120,
        height: 120,
        alt: 'StatementSync Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StatementSync - Transform Bank Statements to Excel',
    description: 'Convert your bank statements to Excel format with AI-powered OCR.',
    creator: '@statementsync',
    images: ['/logo.svg']
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={rethinkSans.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div id="root" className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}
