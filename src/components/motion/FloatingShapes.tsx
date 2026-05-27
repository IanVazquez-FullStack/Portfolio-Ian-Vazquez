'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface Shape {
  id: number;
  type: 'circle' | 'square';
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

/**
 * FloatingShapes - Formas geométricas decorativas que flotan suavemente
 * Respects prefers-reduced-motion (UX-DR8)
 */
export function FloatingShapes() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  const shapes: Shape[] = [
    { id: 1, type: 'circle', size: 120, x: 10, y: 20, duration: 25, delay: 0, color: 'bg-primary/5' },
    { id: 2, type: 'square', size: 80, x: 85, y: 15, duration: 30, delay: 2, color: 'bg-accent/5' },
    { id: 3, type: 'circle', size: 60, x: 75, y: 70, duration: 20, delay: 1, color: 'bg-primary/5' },
    { id: 4, type: 'square', size: 100, x: 15, y: 80, duration: 28, delay: 3, color: 'bg-accent/5' },
    { id: 5, type: 'circle', size: 40, x: 50, y: 10, duration: 22, delay: 4, color: 'bg-primary/5' },
  ];

  const renderShape = (shape: Shape) => {
    const motionProps = {
      className: `absolute ${shape.color}`,
      style: {
        width: shape.size,
        height: shape.size,
        left: `${shape.x}%`,
        top: `${shape.y}%`,
      },
      animate: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      },
      transition: {
        duration: shape.duration,
        delay: shape.delay,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    };

    switch (shape.type) {
      case 'circle':
        return <motion.div key={shape.id} {...motionProps} className={`${motionProps.className} rounded-full`} />;
      case 'square':
        return <motion.div key={shape.id} {...motionProps} className={`${motionProps.className} rounded-lg`} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map(renderShape)}
    </div>
  );
}
