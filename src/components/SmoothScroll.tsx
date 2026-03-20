import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
  enabled?: boolean;
}

export default function SmoothScroll({ children, enabled = true }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Stop/start lenis based on enabled prop (disabled during loader)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (enabled) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, [enabled]);

  return <>{children}</>;
}
