import { useEffect, useState } from 'react';

/**
 * Custom hook to spy on elements scrolling into view using IntersectionObserver.
 * Returns the id of the active element.
 *
 * @param ids Array of element IDs to watch
 * @param options IntersectionObserver configuration options
 */
export function useScrollSpy(
  ids: string[],
  options?: IntersectionObserverInit
): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find matching DOM elements
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track which elements are intersecting and their bounding rect
    const visibleElements = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleElements.set(entry.target.id, entry);
          } else {
            visibleElements.delete(entry.target.id);
          }
        });

        // Determine which element is active
        if (visibleElements.size > 0) {
          // Sort by intersection ratio or proximity to the top of viewport
          const sorted = Array.from(visibleElements.values()).sort((a, b) => {
            // Prefer higher intersection ratio
            if (Math.abs(a.intersectionRatio - b.intersectionRatio) > 0.15) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            // Fallback to whichever is closest to the top of viewport
            return a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top;
          });

          if (sorted[0]) {
            setActiveId(sorted[0].target.id);
          }
        }
      },
      {
        // Margin offset to match where user attention focuses (mostly the top half/center)
        rootMargin: '-10% 0px -50% 0px',
        threshold: [0, 0.2, 0.5, 0.8, 1.0],
        ...options,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Fallback: Initial check using scroll position if nothing is detected yet
    const handleScroll = () => {
      if (visibleElements.size === 0) {
        let currentActive = '';
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is near/above the viewport top margin
          if (rect.top <= 150) {
            currentActive = el.id;
          }
        }
        if (currentActive) {
          setActiveId(currentActive);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once initially

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, options]);

  return activeId;
}
