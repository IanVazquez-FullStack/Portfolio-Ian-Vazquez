'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Función determinista para generar valores pseudo-aleatorios basados en el índice
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * ParticleBackground - Fondo de partículas sutiles que flotan lentamente
 * Respects prefers-reduced-motion (UX-DR8)
 */
export function ParticleBackground() {
  const reducedMotion = useReducedMotion();

  // Memoizar partículas para evitar regeneración en cada render
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: seededRandom(i) * 100,
      y: seededRandom(i + 100) * 100,
      size: seededRandom(i + 200) * 2 + 1, // 1-3px
      duration: seededRandom(i + 300) * 20 + 15, // 15-35s
      delay: seededRandom(i + 400) * 5,
    }));
  }, []);

  if (reducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
          style={{
            width: `${particle.size.toFixed(2)}px`,
            height: `${particle.size.toFixed(2)}px`,
            left: `${particle.x.toFixed(4)}%`,
            top: `${particle.y.toFixed(4)}%`,
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0.2 }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
