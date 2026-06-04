'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle } from 'lucide-react'

interface BinaryResultsProps {
  hasDR: boolean
  confidence: number
}

export function BinaryResults({ hasDR, confidence }: BinaryResultsProps) {
  const color = hasDR ? 'from-red-500 to-orange-500' : 'from-green-500 to-emerald-500'
  const Icon = hasDR ? AlertTriangle : CheckCircle
  const text = hasDR ? 'Diabetic Retinopathy Detected' : 'No Diabetic Retinopathy'

  return (
    <motion.div
      className={`glass p-8 rounded-lg bg-gradient-to-br ${color}/5 border border-${hasDR ? 'red' : 'green'}-500/30`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{text}</h3>
          <p className="text-gray-400 text-sm mt-1">Binary Classification Result</p>
        </div>
      </div>

      {/* Confidence meter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Confidence</span>
          <span className="text-2xl font-bold gradient-text">{confidence.toFixed(1)}%</span>
        </div>

        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
          <motion.div
            className={`h-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Interpretation */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <p className="text-gray-300 text-sm">
          {hasDR
            ? 'The model detected signs consistent with Diabetic Retinopathy. Review the severity grading and explainability heatmap below for detailed analysis.'
            : 'No signs of Diabetic Retinopathy were detected in this fundus image. However, regular screening is still recommended for diabetic patients.'}
        </p>
      </div>
    </motion.div>
  )
}
