'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * StaggeredGrid wraps children with a stagger container.
 * Each direct child receives the slideUp variant automatically.
 * Respects prefers-reduced-motion (UX-DR8).
 */
export function StaggeredGrid({ children, as = 'div' }: StaggeredGridProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const Tag = as;
    return <Tag>{children}</Tag>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggeredItem must wrap each child inside StaggeredGrid.
 * Applies the slideUp variant to individual items.
 */
export function StaggeredItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  );
}
