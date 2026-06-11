'use client'

import { motion } from 'framer-motion'
import { AlertCircle, TrendingUp, Shield, Clock } from 'lucide-react'

const benefits = [
  {
    icon: AlertCircle,
    title: 'Early Detection',
    description: 'Catch DR before vision loss occurs. Early intervention can prevent blindness.',
  },
  {
    icon: TrendingUp,
    title: 'Improved Outcomes',
    description: 'Patients with early DR treatment show 98% better vision preservation rates.',
  },
  {
    icon: Shield,
    title: 'Screening Access',
    description: 'AI makes screening available in remote areas without ophthalmologists.',
  },
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Get analysis within seconds, enabling immediate clinical decisions.',
  },
]

export function EarlyDetectionSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-blue-500/5 to-black/0">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Why Early Detection Matters</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Diabetic Retinopathy is a leading cause of vision loss. Early detection saves sight.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="glass p-8 rounded-lg hover:glass-sm transition-all group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="glass p-8 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold gradient-text mb-2">1 in 3</p>
              <p className="text-gray-400">Diabetics have DR (global average)</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text mb-2">50%</p>
              <p className="text-gray-400">Preventable vision loss with early detection</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text mb-2">2-4 years</p>
              <p className="text-gray-400">Average time for DR progression if untreated</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
