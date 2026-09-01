import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to apply a simple fade‑in + translate animation when the element scrolls into view.
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement | null>,
  options?: { y?: number; duration?: number }
) {
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: options?.y ?? 20,
      duration: options?.duration ?? 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, [ref, options]);
}
