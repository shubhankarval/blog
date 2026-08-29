'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import type { TocItem } from '@lib/toc';
import { cn } from '@lib/utils';

// Matches the rootMargin top offset below, so the fallback and the observer agree on the line
// at which a heading counts as active.
const ACTIVATION_LINE = 96;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

interface TocProps {
  items: TocItem[];
}

export default function Toc({ items }: TocProps) {
  // Tracked by index, not id: two headings with identical text share an id, and keying on that
  // would collide in the ref map and mis-place the indicator.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<number, HTMLLIElement>());

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );

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

      // Nothing is intersecting - happens between widely spaced headings. Fall back to the
      // last heading above the activation line.
      let fallback = 0;
      for (const { index, el } of headings) {
        if (el.getBoundingClientRect().top < ACTIVATION_LINE) {
          fallback = index;
        }
      }
      setActiveIndex(fallback);
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
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  const measure = useCallback(() => {
    if (activeIndex === null) return;
    const element = itemRefs.current.get(activeIndex);
    if (!element) return;
    setIndicator({ top: element.offsetTop, height: element.offsetHeight });
  }, [activeIndex]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // Label wrapping changes item heights independently of viewport width
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);

  if (items.length < 2) return null;

  return (
    // Spans the full gutter beside the prose so the rail can sit centred within it
    <nav
      aria-label="Table of contents"
      className="absolute inset-y-0 left-full hidden w-[calc((100cqw-100%)/2)] xl:block"
    >
      <div className="sticky top-10 mx-auto max-h-[calc(100vh-5rem)] w-52 overflow-y-auto">
        <ul className="relative" ref={listRef}>
          <span className="absolute top-0 bottom-0 left-0 w-px bg-bg-elevated" aria-hidden />
          {indicator.height > 0 && (
            <span
              className={cn(
                'absolute left-0 w-px bg-primary',
                !reducedMotion && 'transition-all duration-200 ease-out'
              )}
              style={{ top: indicator.top, height: indicator.height }}
              aria-hidden
            />
          )}

          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={`${item.id}-${index}`}
                ref={(node) => {
                  if (node) itemRefs.current.set(index, node);
                  else itemRefs.current.delete(index);
                }}
              >
                <a
                  href={`#${item.id}`}
                  title={item.text}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'block truncate py-1.5 text-sm transition-colors hover:text-fg-soft',
                    item.level === 2 ? 'pl-4' : 'pl-8 text-xs',
                    isActive ? 'font-medium text-foreground' : 'text-muted'
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
