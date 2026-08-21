"use client";

import { useEffect, useRef } from "react";

/**
 * Adds the `reveal-visible` class to the element when it scrolls into view.
 * Pair with the `.reveal` styles defined in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
