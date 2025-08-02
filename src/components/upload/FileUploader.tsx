'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn, formatFileSize, validateFileType, validateFileSize } from '@/lib/utils'
import { UploadProgress } from '@/types'

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxSizeMB?: number
  className?: string
  disabled?: boolean
  uploadProgress?: UploadProgress[]
}

export function FileUploader({ 
  onFilesSelected, 
  maxFiles = 5,
  maxSizeMB = 10,
  className,
  disabled = false,
  uploadProgress = []
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[], _rejectedFiles: FileRejection[]) => {
    const newErrors: string[] = []
    
    const validFiles = acceptedFiles.filter(file => {
      if (!validateFileType(file)) {
        newErrors.push(`${file.name}: Invalid file type. Only PDF, JPG, PNG are allowed.`)
        return false
      }
      if (!validateFileSize(file, maxSizeMB)) {
        newErrors.push(`${file.name}: File too large. Maximum size is ${maxSizeMB}MB.`)
        return false
      }
      return true
    })

    if (uploadedFiles.length + validFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed. Please remove some files.`)
      return
    }

    setErrors(newErrors)
    
    if (validFiles.length > 0) {
      const newUploadedFiles = [...uploadedFiles, ...validFiles]
      setUploadedFiles(newUploadedFiles)
      onFilesSelected(validFiles)
    }
  }, [uploadedFiles, maxFiles, maxSizeMB, onFilesSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles,
    disabled,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
  }

  const getFileProgress = (filename: string) => {
    return uploadProgress.find(p => p.filename === filename)
  }

  const getFileIcon = (file: File) => {
    return <FileText className="h-8 w-8 text-muted-foreground" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-foreground" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <Card className={cn(
        "border-2 border-dashed transition-colors cursor-pointer",
        dragActive || isDragActive 
          ? "border-primary bg-primary/5" 
          : "border-gray-300 hover:border-primary hover:bg-primary/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        <CardContent className="p-8">
          <div {...getRootProps()} className="text-center">
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? "Drop files here" : "Upload Bank Statements"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag & drop your files here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Supports PDF, JPG, PNG files up to {maxSizeMB}MB each (Max {maxFiles} files)
            </p>
            <Button variant="outline" disabled={disabled}>
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <Card className="border-muted bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Upload Errors</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h4>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => {
                const progress = getFileProgress(file.name)
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      {getFileIcon(file)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                        {progress && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground capitalize">
                                {progress.stage}
                              </span>
                                                              <span className="text-xs text-muted-foreground">
                                  {progress.progress}%
                                </span>
                            </div>
                            <Progress value={progress.progress} className="h-2" />
                            {progress.message && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {progress.message}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {progress && getStatusIcon(progress.status)}
                      {!progress?.status || progress.status === 'failed' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8 p-0"
                          disabled={disabled}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
