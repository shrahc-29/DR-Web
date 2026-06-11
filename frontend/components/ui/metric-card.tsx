'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  icon?: LucideIcon
  label: string
  value: string
  description?: string
  gradient?: string
  variant?: 'default' | 'accent' | 'highlight'
}

export function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  gradient = 'from-cyan-400 to-blue-500',
  variant = 'default',
}: MetricCardProps) {
  const variantClasses = {
    default: 'glass hover:glass-sm',
    accent: 'glass-sm hover:glass',
    highlight: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 hover:border-cyan-300/50',
  }

  return (
    <motion.div
      className={`p-6 rounded-lg transition-all ${variantClasses[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-6 h-6 text-black" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold gradient-text">{value}</p>
          {description && <p className="text-gray-500 text-xs mt-2">{description}</p>}
        </div>
      </div>
    </motion.div>
  )
}
