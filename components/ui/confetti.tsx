'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
  angle: number
  velocity: number
}

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
      angle: Math.random() * 360,
      velocity: 4 + Math.random() * 6,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            left: `${particle.left}%`,
            top: '-10px',
            opacity: 1,
            rotate: particle.angle,
          }}
          animate={{
            top: '100vh',
            opacity: 0,
            rotate: particle.angle + 180,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeIn',
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 100%, 50%)`,
          }}
        />
      ))}
    </div>
  )
}
