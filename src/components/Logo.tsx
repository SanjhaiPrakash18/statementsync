'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'inverted'
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
  
  const getLogoColor = () => {
    switch (variant) {
      case 'white':
        return '#ffffff'
      case 'inverted':
        return 'hsl(var(--background))'
      default:
        return 'hsl(var(--foreground))'
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
        style={{ color: getLogoColor() }}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Main document background */}
        <rect 
          x="15" 
          y="15" 
          width="90" 
          height="90" 
          rx="12" 
          ry="12" 
          fill="currentColor" 
          filter="url(#shadow)"
        />
        
        {/* Document content area */}
        <rect 
          x="25" 
          y="25" 
          width="70" 
          height="70" 
          rx="6" 
          ry="6" 
          fill={variant === 'inverted' ? 'hsl(var(--foreground))' : 'white'}
        />
        
        {/* Document header lines */}
        <rect 
          x="32" 
          y="35" 
          width="40" 
          height="2" 
          rx="1" 
          fill={variant === 'inverted' ? 'hsl(var(--background))' : 'currentColor'} 
          opacity="0.8"
        />
        <rect 
          x="32" 
          y="42" 
          width="40" 
          height="2" 
          rx="1" 
          fill={variant === 'inverted' ? 'hsl(var(--background))' : 'currentColor'} 
          opacity="0.8"
        />
        <rect 
          x="32" 
          y="49" 
          width="25" 
          height="2" 
          rx="1" 
          fill={variant === 'inverted' ? 'hsl(var(--background))' : 'currentColor'} 
          opacity="0.6"
        />
        
        {/* Dollar sign circle */}
        <circle 
          cx="60" 
          cy="67" 
          r="15" 
          fill={variant === 'inverted' ? 'hsl(var(--background))' : 'currentColor'}
        />
        <text 
          x="60" 
          y="73" 
          fontFamily="Arial, sans-serif" 
          fontSize="18" 
          fontWeight="bold" 
          textAnchor="middle" 
          fill={variant === 'inverted' ? 'hsl(var(--foreground))' : 'white'}
        >
          $
        </text>
        
        {/* Transfer arrows */}
        <g transform="translate(78, 32)">
          <path 
            d="M0 0 L8 0 L6 -2 M8 0 L6 2" 
            stroke={variant === 'inverted' ? 'hsl(var(--background))' : 'currentColor'} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            opacity="0.8"
          />
        </g>
        
        <g transform="translate(78, 42)">
          <path 
            d="M8 0 L0 0 L2 -2 M0 0 L2 2" 
            stroke={variant === 'inverted' ? 'hsl(var(--background))' : 'currentColor'} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
            opacity="0.8"
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
            variant === 'inverted' && 'text-background',
            variant === 'default' && 'text-foreground'
          )}
        >
          StatementSync
        </span>
      )}
    </div>
  )
}