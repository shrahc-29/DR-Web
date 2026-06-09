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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function HowItWorksSection() {
  return (
    <section className="py-20 px-2 bg-gradient-to-b from-black/0 to-cyan-500/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How It Works</h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Five simple steps from image upload to comprehensive DR analysis with explainable AI
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-5 gap-4 relative items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div key={idx} variants={itemVariants} className="relative group flex flex-col h-full">
                {/* Desktop connection line shifted up slightly to match smaller icon size */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-2 w-4 h-0.5 bg-gradient-to-r from-cyan-400/40 to-transparent z-10" />
                )}

                <div className="glass p-4 rounded-lg flex-1 flex flex-col items-center text-center justify-between hover:glass-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                  {/* Top Content */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1.5">{step.title}</h3>
                    <p className="text-gray-400 text-xs line-clamp-4 mb-4">{step.description}</p>
                  </div>
                  
                  {/* Bottom Serial Number */}
                  <div className="text-xl font-bold text-cyan-400/40 mt-auto w-full">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}