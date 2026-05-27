'use client';

import { usePathname } from 'next/navigation';
import { ParticleBackground } from './ParticleBackground';
import { FloatingShapes } from './FloatingShapes';

/**
 * AnimatedBackground - Wrapper que muestra animaciones solo en páginas que no son el home
 */
export function AnimatedBackground() {
  const pathname = usePathname();
  
  // No mostrar animaciones en el home
  if (pathname === '/') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <ParticleBackground />
      <FloatingShapes />
    </div>
  );
}
