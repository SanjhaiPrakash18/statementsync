'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'gradient'
  className?: string
  showText?: boolean
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64
}

export function Logo({ size = 'md', variant = 'default', className, showText = true }: LogoProps) {
  const logoSize = sizeMap[size]
  
  const getGradientId = () => {
    switch (variant) {
      case 'white':
        return 'logoGradientWhite'
      case 'gradient':
        return 'logoGradientCustom'
      default:
        return 'logoGradient'
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg 
        width={logoSize} 
        height={logoSize} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#1D4ED8', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#1E40AF', stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="logoGradientWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#f8fafc', stopOpacity: 1}} />
          </linearGradient>
          <linearGradient id="logoGradientCustom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Main document background */}
        <rect 
          x="20" 
          y="15" 
          width="80" 
          height="90" 
          rx="8" 
          ry="8" 
          fill={`url(#${getGradientId()})`} 
          filter="url(#shadow)"
        />
        
        {/* Document header lines */}
        <rect x="30" y="28" width="35" height="3" rx="1.5" fill="white" opacity="0.9"/>
        <rect x="30" y="36" width="35" height="3" rx="1.5" fill="white" opacity="0.9"/>
        <rect x="30" y="52" width="20" height="3" rx="1.5" fill="white" opacity="0.7"/>
        
        {/* Dollar sign circle */}
        <circle cx="60" cy="70" r="18" fill="white" opacity="0.95"/>
        <text 
          x="60" 
          y="78" 
          fontFamily="Arial, sans-serif" 
          fontSize="20" 
          fontWeight="bold" 
          textAnchor="middle" 
          fill={`url(#${getGradientId()})`}
        >
          $
        </text>
        
        {/* Arrow elements */}
        <g transform="translate(75, 25)">
          <path 
            d="M5 8 L15 8 L12 5 M15 8 L12 11" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            opacity="0.9"
          />
        </g>
        
        <g transform="translate(75, 40)">
          <path 
            d="M15 8 L5 8 L8 5 M5 8 L8 11" 
            stroke="white" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            opacity="0.9"
          />
        </g>
      </svg>
      
      {showText && (
        <span 
          className={cn(
            'font-bold tracking-tight',
            size === 'sm' && 'text-lg',
            size === 'md' && 'text-xl',
            size === 'lg' && 'text-2xl',
            size === 'xl' && 'text-3xl',
            variant === 'white' && 'text-white',
            variant === 'gradient' && 'vercel-gradient-text',
            variant === 'default' && 'text-foreground'
          )}
        >
          StatementSync
        </span>
      )}
    </div>
  )
}