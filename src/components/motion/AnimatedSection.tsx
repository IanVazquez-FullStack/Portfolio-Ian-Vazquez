'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeIn, slideUp } from '@/lib/motion/variants';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  variant?: 'fadeIn' | 'slideUp';
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * AnimatedSection wraps content with a viewport-triggered animation.
 * Uses string-based variants to avoid SSR opacity:0 CLS issues.
 * Respects prefers-reduced-motion (UX-DR8).
 */
export function AnimatedSection({
  children,
  delay = 0,
  variant = 'fadeIn',
  as = 'div',
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  if (reducedMotion) {
    return <Tag>{children}</Tag>;
  }

  const variants = variant === 'slideUp' ? slideUp : fadeIn;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
