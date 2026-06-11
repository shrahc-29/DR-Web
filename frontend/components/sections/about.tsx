'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Eye } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">About RetinaVision</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Advancing retinal disease screening through cutting-edge deep learning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Deep Learning Technology
              </h3>
              <p className="text-gray-300 leading-relaxed">
                RetinaVision AI leverages state-of-the-art convolutional neural networks trained on thousands of
                annotated fundus images. Our ensemble models combine the strengths of ResNet, VGG, DenseNet, and
                EfficientNet architectures for robust, accurate predictions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Explainable AI
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Every prediction is accompanied by Grad-CAM (Gradient-weighted Class Activation Maps) visualizations,
                showing exactly which regions of the retina influenced the model&apos;s decision. This transparency builds
                clinical trust and aids in diagnosis.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Clinical Validation
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our models have been validated against ophthalmologist annotations and are designed to assist—not
                replace—professional clinical judgment. Always consult with a qualified healthcare provider.
              </p>
            </div>
          </motion.div>

          {/* Right side - Tech specs */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="glass p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">Technical Specifications</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong>Input:</strong> Fundus images (JPG, PNG, 512×512 minimum)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong>Binary Output:</strong> DR vs No DR (with confidence %)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong>Multi-class Output:</strong> 5-stage severity (0=No DR, 4=Proliferative DR)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong>Inference Time:</strong> &lt;500ms per image
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>
                    <strong>Explainability:</strong> Grad-CAM heatmap overlay
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">DR Severity Stages</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <span className="text-cyan-400">Stage 0:</span> No DR
                </li>
                <li>
                  <span className="text-cyan-400">Stage 1:</span> Mild NPDR
                </li>
                <li>
                  <span className="text-cyan-400">Stage 2:</span> Moderate NPDR
                </li>
                <li>
                  <span className="text-cyan-400">Stage 3:</span> Severe NPDR
                </li>
                <li>
                  <span className="text-cyan-400">Stage 4:</span> Proliferative DR
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.div
          className="mt-16 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 text-center text-sm">
            <strong>Disclaimer:</strong> RetinaVision AI is a screening tool designed to assist healthcare professionals.
            It is not a diagnostic device. Always consult with a qualified ophthalmologist for clinical diagnosis and
            treatment decisions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
