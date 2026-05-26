'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * AnimatedSection wraps content with a viewport-triggered fade-in animation.
 * Respects prefers-reduced-motion (UX-DR8).
 */
export function AnimatedSection({
  children,
  delay = 0,
  as = 'div',
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Tag = as;
    return <Tag>{children}</Tag>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
