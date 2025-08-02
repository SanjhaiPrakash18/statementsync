'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

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
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div 
        className="flex-shrink-0 relative"
        style={{ 
          width: logoSize, 
          height: logoSize,
          filter: variant === 'white' ? 'brightness(0) invert(1)' : variant === 'inverted' ? 'brightness(0) invert(1)' : 'none'
        }}
      >
        <Image
          src="/logo.svg"
          alt="StatementSync Logo"
          width={logoSize}
          height={logoSize}
          className="object-contain"
          priority
        />
      </div>
      
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