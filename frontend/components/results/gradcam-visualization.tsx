'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface GradCAMVisualizationProps {
  originalImage: string
  gradcamHeatmap: string
}

export function GradCAMVisualization({ originalImage, gradcamHeatmap }: GradCAMVisualizationProps) {
  const [showHeatmap, setShowHeatmap] = useState(true)

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="glass p-6 rounded-lg">
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-white">Explainable AI - Grad-CAM Heatmap</h3>
          <p className="text-gray-400 text-sm">
            The heatmap shows which regions of the retina most influenced the model&apos;s decision. Warmer colors
            (red/yellow) indicate higher attention regions.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg w-fit">
          <button
            onClick={() => setShowHeatmap(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              !showHeatmap ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Original
          </button>
          <button
            onClick={() => setShowHeatmap(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              showHeatmap ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Grad-CAM
          </button>
        </div>

        {/* Image display */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-black/50 border border-white/10">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: showHeatmap ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={gradcamHeatmap}
              alt="Grad-CAM heatmap visualization"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showHeatmap ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={originalImage}
              alt="Original fundus image"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Legend */}
      <div className="glass p-6 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-4">Heatmap Legend</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-red-600" />
            <span className="text-gray-300 text-sm">High influence - Strong DR indicators</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-yellow-500" />
            <span className="text-gray-300 text-sm">Medium influence - Possible pathology</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-blue-500" />
            <span className="text-gray-300 text-sm">Low influence - Normal tissue</span>
          </div>
        </div>
      </div>

      {/* Interpretation guide */}
      <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <p className="text-gray-300 text-sm">
          <strong>How to interpret:</strong> Red/hot regions show where the model identified possible diabetic
          retinopathy changes (microaneurysms, hemorrhages, exudates). Green/cool regions appear normal. This is a
          screening tool—always consult an ophthalmologist for clinical diagnosis.
        </p>
      </div>
    </motion.div>
  )
}
