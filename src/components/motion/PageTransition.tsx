"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This component intentionally defers animation until after hydration
    // to avoid server/client markup mismatch during page load.
    const id = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  // Durante SSR y la primera hidratación, evitamos animar para prevenir mismatches.
  if (!isMounted || (shouldReduceMotion ?? true)) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
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
