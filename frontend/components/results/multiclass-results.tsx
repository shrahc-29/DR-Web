'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SeverityBadge } from '@/components/ui/severity-badge'

const STAGES = [
  { name: 'No DR', label: 'Stage 0', color: 'from-green-500 to-emerald-500' },
  { name: 'Mild NPDR', label: 'Stage 1', color: 'from-yellow-500 to-amber-500' },
  { name: 'Moderate NPDR', label: 'Stage 2', color: 'from-orange-500 to-amber-600' },
  { name: 'Severe NPDR', label: 'Stage 3', color: 'from-orange-600 to-red-600' },
  { name: 'Proliferative DR', label: 'Stage 4', color: 'from-red-600 to-red-700' },
]

interface MulticlassResultsProps {
  predictions: number[] // Array of 5 probabilities
  predictedStage: number // 0-4
}

export function MulticlassResults({ predictions, predictedStage }: MulticlassResultsProps) {
  const data = STAGES.map((stage, idx) => ({
    name: stage.name,
    probability: Math.round(predictions[idx] * 1000) / 10,
  }))

  const predicted = STAGES[predictedStage]

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Predicted Stage */}
      <div className={`glass p-8 rounded-lg bg-gradient-to-br ${predicted.color}/5 border border-white/10`}>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-3">Predicted Severity Stage</p>
              <h3 className="text-3xl font-bold text-white mb-2">{predicted.name}</h3>
            </div>
            <SeverityBadge stage={predictedStage as 0 | 1 | 2 | 3 | 4} probability={predictions[predictedStage]} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Overall Probability:</span>
            <span className="text-2xl font-bold gradient-text">
              {(predictions[predictedStage] * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Probability Distribution Chart */}
      <div className="glass p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-4">DR Severity Distribution</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(200,200,200,0.5)" angle={-45} height={80} />
            <YAxis stroke="rgba(200,200,200,0.5)" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(34, 211, 238, 0.3)',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value) => `${value.toFixed(1)}%`}
            />
            <Bar dataKey="probability" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stage Details */}
      <div className="glass p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-4">What This Means</h4>
        <div className="space-y-3">
          {STAGES.map((stage, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                idx === predictedStage ? 'bg-white/10 border border-cyan-400/50' : 'bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${idx === predictedStage ? 'text-cyan-400' : 'text-gray-300'}`}>
                  {stage.name}
                </span>
                <span className="text-gray-400 text-sm">{(predictions[idx] * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
