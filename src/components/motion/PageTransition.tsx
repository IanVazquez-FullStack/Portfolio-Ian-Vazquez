"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Durante SSR/hidratación, useReducedMotion retorna null.
  // Ser conservador: no animar hasta tener una respuesta definitiva.
  if (shouldReduceMotion ?? true) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        role="presentation"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
