'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

interface StaggeredGridProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * StaggeredGrid wraps children with a stagger container.
 * Each direct child must be wrapped with StaggeredItem.
 * Respects prefers-reduced-motion (UX-DR8).
 */
export function StaggeredGrid({ children, as = 'div', className, ...rest }: StaggeredGridProps) {
  const reducedMotion = useReducedMotion();
  const Tag = as as ElementType;
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reducedMotion) {
    return <Tag className={className} {...(rest as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
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
