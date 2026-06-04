'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { Confetti } from '@/components/ui/confetti'

interface DragDropZoneProps {
  onImageSelect: (file: File, preview: string) => void
  isLoading: boolean
}

export function DragDropZone({ onImageSelect, isLoading }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setError('Please upload a JPG or PNG image')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
      onImageSelect(file, result)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>
      {preview ? (
        <motion.div
          className="relative w-full rounded-xl overflow-hidden glass p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="relative aspect-square rounded-lg overflow-hidden bg-black/50">
            <Image
              src={preview}
              alt="Fundus image preview"
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={() => {
              setPreview(null)
              setError(null)
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            disabled={isLoading}
            className="mt-4 w-full py-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors disabled:opacity-50"
          >
            Choose Different Image
          </button>
        </motion.div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full border-2 border-dashed rounded-xl p-8 transition-all text-center cursor-pointer ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/10'
              : 'border-white/20 hover:border-cyan-400/50 hover:bg-cyan-500/5'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileInput}
            className="hidden"
            disabled={isLoading}
          />

          <div onClick={() => fileInputRef.current?.click()} className="space-y-3">
            <motion.div
              className="flex justify-center"
              animate={{ y: isDragging ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Upload className="w-6 h-6 text-black" />
              </div>
            </motion.div>

            <div>
              <p className="text-white font-semibold">
                {isDragging ? 'Drop your image here' : 'Drag and drop a fundus image'}
              </p>
              <p className="text-gray-400 text-sm mt-1">or click to browse</p>
            </div>

            <p className="text-gray-500 text-xs">
              Supports JPG and PNG, max 10MB. Minimum 512×512 pixels recommended.
            </p>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </motion.div>
      )}
    </div>
  )
}
