'use client'

import { motion } from 'framer-motion'

const SEVERITY_COLORS = {
  0: { bg: 'from-green-500 to-emerald-500', text: 'text-green-400', label: 'No DR' },
  1: { bg: 'from-yellow-500 to-amber-500', text: 'text-yellow-400', label: 'Mild' },
  2: { bg: 'from-orange-500 to-amber-600', text: 'text-orange-400', label: 'Moderate' },
  3: { bg: 'from-orange-600 to-red-600', text: 'text-orange-400', label: 'Severe' },
  4: { bg: 'from-red-600 to-red-700', text: 'text-red-400', label: 'Proliferative' },
}

interface SeverityBadgeProps {
  stage: 0 | 1 | 2 | 3 | 4
  probability?: number
}

export function SeverityBadge({ stage, probability }: SeverityBadgeProps) {
  const color = SEVERITY_COLORS[stage]

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${color.bg} bg-clip-padding border border-transparent`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
      <span className="text-white font-semibold text-sm">{color.label}</span>
      {probability !== undefined && <span className="text-white/80 text-sm">({(probability * 100).toFixed(1)}%)</span>}
    </motion.div>
  )
}
