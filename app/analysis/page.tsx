'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { DragDropZone } from '@/components/upload/drag-drop-zone'
import { BinaryResults } from '@/components/results/binary-results'
import { MulticlassResults } from '@/components/results/multiclass-results'
import { GradCAMVisualization } from '@/components/results/gradcam-visualization'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function AnalysisPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<{
    hasDR: boolean
    binaryConfidence: number
    predictions: number[]
    predictedStage: number
    gradcam: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setImageFile(file)
    setImagePreview(preview)
    setError(null)
    setResults(null)
  }, [])

  const analyzeImage = useCallback(async () => {
    if (!imageFile) return

    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call - in production, this would send to a backend
      // For demo purposes, generate mock results
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock results
      const mockHasDR = Math.random() > 0.4
      const mockBinaryConfidence = 80 + Math.random() * 20
      const mockPredictions = [
        Math.random() * 0.3,
        Math.random() * 0.3,
        Math.random() * 0.3,
        Math.random() * 0.3,
        Math.random() * 0.3,
      ]

      // Normalize predictions
      const sum = mockPredictions.reduce((a, b) => a + b, 0)
      const normalized = mockPredictions.map((p) => p / sum)

      // Find predicted stage
      const predictedStage = normalized.indexOf(Math.max(...normalized))

      // Create mock Grad-CAM (in production, this would come from the model)
      const mockGradcam = imagePreview

      setResults({
        hasDR: mockHasDR,
        binaryConfidence: mockBinaryConfidence,
        predictions: normalized,
        predictedStage,
        gradcam: mockGradcam,
      })
    } catch (err) {
      setError('Failed to analyze image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [imageFile, imagePreview])

  const downloadReport = () => {
    if (!results) return
    // Mock download - in production, this would generate a PDF
    console.log('Downloading report...')
  }

  return (
    <main className="w-full">
      <Navigation />

      <section className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Image Analysis</h1>
            <p className="text-gray-400">Upload a fundus image to detect diabetic retinopathy and view detailed analysis</p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Upload & Analysis */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Select Image</h2>
                <DragDropZone onImageSelect={handleImageSelect} isLoading={isLoading} />
              </div>

              {imagePreview && !results && (
                <motion.button
                  onClick={analyzeImage}
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? 'Analyzing Image...' : 'Analyze Image'}
                </motion.button>
              )}

              {error && (
                <motion.div
                  className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
            </motion.div>

            {/* Right: Results Preview */}
            <motion.div
              className="lg:sticky lg:top-24 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isLoading && (
                <div className="glass p-8 rounded-lg flex flex-col items-center justify-center gap-4 min-h-64">
                  <LoadingSpinner size="lg" message="Analyzing your fundus image..." />
                  <p className="text-gray-500 text-sm">This usually takes a few seconds</p>
                </div>
              )}

              {results && !isLoading && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <BinaryResults hasDR={results.hasDR} confidence={results.binaryConfidence} />

                  <motion.button
                    onClick={downloadReport}
                    className="w-full py-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors border border-white/10 rounded-lg hover:border-cyan-400/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    Download PDF Report
                  </motion.button>
                </motion.div>
              )}

              {!results && !isLoading && !imagePreview && (
                <div className="glass p-8 rounded-lg text-center">
                  <p className="text-gray-400">Upload an image to see results here</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Full-width results sections */}
          {results && !isLoading && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Multiclass Results */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Severity Grading</h2>
                <MulticlassResults
                  predictions={results.predictions}
                  predictedStage={results.predictedStage}
                />
              </div>

              {/* Grad-CAM Visualization */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Explainability Analysis</h2>
                <GradCAMVisualization originalImage={results.gradcam} gradcamHeatmap={results.gradcam} />
              </div>

              {/* Clinical Recommendations */}
              <div className="glass p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Clinical Recommendations</h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>
                    ✓ <strong>Follow-up screening:</strong> {results.hasDR ? 'Within 3-6 months' : 'Annually recommended'}
                  </p>
                  <p>
                    ✓ <strong>Ophthalmologist consultation:</strong> Strongly recommended for confirmation and
                    treatment planning
                  </p>
                  <p>
                    ✓ <strong>Disclaimer:</strong> This is a screening tool only. Professional clinical judgment by a
                    qualified ophthalmologist is essential for diagnosis and treatment decisions.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
