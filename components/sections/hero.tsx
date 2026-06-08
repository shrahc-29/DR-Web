'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const floatingElements = [
    { delay: 0, x: -100, y: 50 },
    { delay: 0.2, x: 100, y: -50 },
    { delay: 0.4, x: -50, y: -100 },
    { delay: 0.6, x: 150, y: 100 },
  ]

  return (
    // Changed min-h-[80vh] to py-20 to let content define height naturally, and set pb-0 to eliminate the bottom gap
    <section className="flex items-center justify-center relative overflow-hidden pt-24 pb-8 mb-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((el, idx) => (
          <motion.div
            key={idx}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #06b6d4, transparent)',
            }}
            animate={{
              x: [el.x, el.x + 50, el.x],
              y: [el.y, el.y + 50, el.y],
            }}
            transition={{
              duration: 6 + el.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {' '}
            <span className="gradient-text">Diabetic Retinopathy</span>{' '}
            Detection & Grading
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Advanced deep learning for instant DR screening. Get binary detection results and multi-class severity
            grading with explainable AI visualization—all in seconds.
          </p>

          {/* Buttons container has no margin at the bottom */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/analysis"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold px-8 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Analyze Fundus Image
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.button
              className="inline-flex items-center gap-2 glass px-8 py-4 rounded-lg text-cyan-400 font-semibold hover:bg-white/10 hover:text-cyan-300 transition-all border border-cyan-400/30 hover:border-cyan-300/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('about')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}