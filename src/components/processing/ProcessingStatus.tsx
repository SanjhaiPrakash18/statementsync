'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircle, Circle, AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { ProcessingStep } from '@/types'

interface ProcessingStatusProps {
  filename: string
  currentStep: number
  progress: number
  steps: ProcessingStep[]
  className?: string
}

export function ProcessingStatus({
  filename,
  currentStep,
  progress,
  steps,
  className
}: ProcessingStatusProps) {
  const [startTime, setStartTime] = useState<string>('')

  // Set start time only on client side to avoid hydration mismatch
  useEffect(() => {
    setStartTime(new Date().toLocaleTimeString())
  }, [])

  const getStepIcon = (step: ProcessingStep, _index: number) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-foreground" />
    } else if (step.status === 'failed') {
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />
    } else if (step.status === 'processing') {
      return <Loader2 className="h-5 w-5 text-foreground animate-spin" />
    } else {
      return <Circle className="h-5 w-5 text-muted" />
    }
  }

  const getStepStatus = (step: ProcessingStep, index: number) => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return step.status
    return 'pending'
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Processing Statement</span>
          <span className="text-sm font-normal text-muted-foreground">{progress}%</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground truncate">{filename}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Processing...</span>
            <span>{progress}% complete</span>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step, index)
            const isActive = index === currentStep

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                  isActive && "bg-muted/50 border border-border",
                  status === 'completed' && "bg-muted/30",
                  status === 'failed' && "bg-muted/30"
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStepIcon(step, index)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "text-sm font-medium",
                    status === 'completed' && "text-foreground",
                    status === 'failed' && "text-muted-foreground",
                    status === 'processing' && "text-foreground",
                    status === 'pending' && "text-muted-foreground"
                  )}>
                    {step.name}
                  </h4>
                  
                  {step.message && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {step.message}
                    </p>
                  )}
                  
                  {status === 'processing' && step.progress > 0 && (
                    <div className="mt-2">
                      <Progress value={step.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {step.progress}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    status === 'completed' && "bg-muted text-foreground",
                    status === 'failed' && "bg-muted text-muted-foreground",
                    status === 'processing' && "bg-muted text-foreground",
                    status === 'pending' && "bg-muted text-muted-foreground"
                  )}>
                    {status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-muted rounded-lg p-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">Processing Details</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>File Size:</span>
              <span>2.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span>PDF</span>
            </div>
            <div className="flex justify-between">
              <span>Started:</span>
              <span>{startTime || 'Loading...'}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Time:</span>
              <span>~2 minutes</span>
            </div>
          </div>
        </div>

        {progress < 100 && (
          <div className="text-center py-4">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-foreground" />
              <span className="processing-dots">Processing your statement</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
