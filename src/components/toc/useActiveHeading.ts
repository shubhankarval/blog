'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@lib/toc';

// Matches the rootMargin top offset below, so the fallback and the observer agree on the line
// at which a heading counts as active.
const ACTIVATION_LINE = 96;

/**
 * Resolves the heading the reader is currently in, plus how far through the page they are.
 * Runs once per page and is shared by every Toc surface, so the rail and the bars can never
 * disagree about the active section.
 */
export function useActiveHeading(items: TocItem[]) {
  // Tracked by index, not id: two headings with identical text share an id, so keying on that
  // would collide.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;

    const headings = items
      .map((item, index) => ({ index, el: document.getElementById(item.id) }))
      .filter((entry): entry is { index: number; el: HTMLElement } => entry.el !== null);

    const visible = new Map<string, boolean>();

    const resolveActive = () => {
      // The last section is often too short to ever reach the activation band, so pin it once
      // the page cannot scroll any further.
      const scrolled = window.scrollY + window.innerHeight;
      if (scrolled >= document.documentElement.scrollHeight - 2) {
        setActiveIndex(items.length - 1);
        return;
      }

      const firstVisible = items.findIndex((item) => visible.get(item.id));
      if (firstVisible !== -1) {
        setActiveIndex(firstVisible);
        return;
      }

      // Nothing is intersecting - happens above the first heading and between widely spaced
      // ones. Fall back to the last heading above the activation line, or nothing at all.
      let fallback: number | null = null;
      for (const { index, el } of headings) {
        if (el.getBoundingClientRect().top < ACTIVATION_LINE) {
          fallback = index;
        }
      }
      setActiveIndex(fallback);
    };

    const resolveProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max)));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        resolveActive();
      },
      { rootMargin: `-${ACTIVATION_LINE}px 0px -66% 0px` }
    );

    headings.forEach(({ el }) => observer.observe(el));

    // The observer only fires when an intersection flips, which never happens while scrolling
    // through the final screenful - so drive the bottom and fallback cases from scroll too.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        resolveActive();
        resolveProgress();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    resolveProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return { activeIndex, progress };
}
