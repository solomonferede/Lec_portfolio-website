import { useEffect, useRef, useState } from "react";

/**
 * Hook for section reveal animation on scroll
 * Respects prefers-reduced-motion
 */
export function useScrollReveal(options = {}) {
  // Start hidden; we'll add a `will-reveal` class to the element so
  // CSS only hides when JS is active. This preserves no-JS visibility.
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef(null);
  const { threshold = 0.1, rootMargin = "0px" } = options;

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const element = elementRef.current;
    if (!element) return;

    // If user prefers reduced motion, reveal immediately and don't add will-reveal
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    // Add marker class so CSS knows JS is active and can hide elements safely
    element.classList.add("will-reveal");

    // For animation: reveal when in viewport. Start hidden by default.
    setIsRevealed(false);

    // Check if element is already in viewport on mount
    const checkViewport = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport =
        rect.top < window.innerHeight + 100 && rect.bottom > -100;
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
      { threshold, rootMargin: rootMargin || "0px" }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timer);
      if (element) {
        observer.unobserve(element);
        element.classList.remove("will-reveal");
      }
    };
  }, [threshold, rootMargin]);

  return [elementRef, isRevealed];
}
