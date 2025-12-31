import { useEffect, useRef, useState } from 'react';

/**
 * Hook for section reveal animation on scroll
 * Respects prefers-reduced-motion
 */
export function useScrollReveal(options = {}) {
  // Start with true to ensure content is visible by default
  const [isRevealed, setIsRevealed] = useState(true);
  const elementRef = useRef(null);
  const { threshold = 0.1, rootMargin = '0px' } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Already true by default
    }

    const element = elementRef.current;
    if (!element) return;

    // For animation: temporarily hide, then reveal on scroll
    setIsRevealed(false);

    // Check if element is already in viewport on mount
    const checkViewport = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100;
      return isInViewport;
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (checkViewport()) {
        setIsRevealed(true);
      }
    }, 50);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: rootMargin || '0px' }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timer);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isRevealed];
}
