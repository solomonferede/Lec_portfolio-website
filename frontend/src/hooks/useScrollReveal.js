import { useEffect, useRef, useState } from 'react';

/**
 * Hook for section reveal animation on scroll
 * Respects prefers-reduced-motion
 */
export function useScrollReveal(options = {}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef(null);
  const { threshold = 0.1, rootMargin = '0px' } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isRevealed];
}

