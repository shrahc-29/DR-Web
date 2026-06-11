'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const modelData = [
  { name: 'ResNet50 (multi-class)', accuracy: 78, precision: 76, recall: 78, f1: 75 },
  { name: 'VGG19 (multi-class)', accuracy: 72, precision: 69, recall: 72, f1: 69 },
  { name: 'DenseNet121 (binary)', accuracy: 77, precision: 79, recall: 77, f1: 76 },
  { name: 'EfficientNetB0 (binary)', accuracy: 83, precision: 85, recall: 83, f1: 83 },
]

const metrics = [
  { label: 'Binary Detection', value: '83%' },
  { label: 'Multi-class Grading', value: '78%' },
  { label: 'Sensitivity', value: '72.42%' },
  { label: 'Specificity', value: '93.72%' },
]

export function ModelPerformanceSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Model Performance</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trained on thousands of retinal images with state-of-the-art accuracy
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="grid md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {metrics.map((metric, idx) => (
            <div key={idx} className="glass p-6 rounded-lg text-center hover:glass-sm transition-all">
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <p className="text-3xl font-bold gradient-text">{metric.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          className="glass p-8 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-white mb-6">Model Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(200,200,200,0.5)" />
              <YAxis
                stroke="rgba(200,200,200,0.5)"
                domain={[0, 100]}
                ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              />              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(34, 211, 238, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Bar dataKey="accuracy" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="precision" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              <Bar dataKey="recall" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="f1" fill="#1d4ed8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Model Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">Training Data</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ 10,000+ fundus images</li>
              <li>✓ Balanced DR severity distribution</li>
              <li>✓ Cross-validated with ophthalmologists</li>
              <li>✓ Multiple imaging devices/resolutions</li>
            </ul>
          </div>
          <div className="glass p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-cyan-400 mb-3">Architecture</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Transfer learning from ImageNet</li>
              <li>✓ Ensemble of multiple models</li>
              <li>✓ Grad-CAM explainability integrated</li>
              <li>✓ Real-time inference (&lt;500ms)</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
