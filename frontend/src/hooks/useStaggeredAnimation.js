import { useEffect, useRef, useState } from 'react';

/**
 * Hook for staggered animation on grid items
 * Animates items one by one with a delay
 */
export function useStaggeredAnimation(options = {}) {
  const { delay = 100, threshold = 0.1 } = options;
  const [revealedItems, setRevealedItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.animate-item');
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target);
            setTimeout(() => {
              setRevealedItems((prev) => new Set([...prev, index]));
            }, index * delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [delay, threshold]);

  return [containerRef, revealedItems];
}

