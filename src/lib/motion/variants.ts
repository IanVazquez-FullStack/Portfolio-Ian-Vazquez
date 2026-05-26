import type { Variants } from 'framer-motion';

/**
 * Fade-in variant: animates only opacity.
 * Compliant with FR-17 (animate only transform/opacity).
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

/**
 * Slide-up variant: animates opacity + translateY.
 * Compliant with FR-17 (animate only transform/opacity).
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/**
 * Stagger container variant: 100ms between children (within 80-120ms range).
 * Children must have their own variants (e.g., fadeIn or slideUp).
 */
export const stagger: Variants = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};
