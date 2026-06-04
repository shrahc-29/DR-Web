'use client'

import { motion } from 'framer-motion'
import { Upload, Cpu, Eye, BarChart3, Lightbulb } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Upload a high-quality fundus image or use drag-and-drop',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Our deep learning model processes the image instantly',
  },
  {
    icon: Eye,
    title: 'DR Detection',
    description: 'Binary classification: Diabetic Retinopathy or No DR',
  },
  {
    icon: BarChart3,
    title: 'Severity Grading',
    description: 'Multi-class prediction of DR stage (0-4)',
  },
  {
    icon: Lightbulb,
    title: 'Explainability',
    description: 'Grad-CAM heatmap shows which regions influenced the decision',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black/0 to-cyan-500/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Five simple steps from image upload to comprehensive DR analysis with explainable AI
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-5 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div key={idx} variants={itemVariants} className="relative group">
                {/* Connection line for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent" />
                )}

                <div className="glass p-6 rounded-xl h-full flex flex-col items-center text-center hover:glass-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                  <div className="mt-4 text-2xl font-bold text-cyan-400/50">{String(idx + 1).padStart(2, '0')}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
