'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@lib/utils';
import { useToc } from './TocProvider';

// Fraction of the item's height the indicator spans, centred on the label.
const INDICATOR_SCALE = 0.8;

export default function TocRail() {
  const toc = useToc();
  const activeIndex = toc?.activeIndex ?? null;

  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef(new Map<number, HTMLLIElement>());

  const measure = useCallback(() => {
    const element = activeIndex === null ? null : itemRefs.current.get(activeIndex);
    if (!element) {
      setIndicator((prev) => (prev.height === 0 ? prev : { top: 0, height: 0 }));
      return;
    }
    const height = element.offsetHeight * INDICATOR_SCALE;
    setIndicator({
      top: element.offsetTop + (element.offsetHeight - height) / 2,
      height,
    });
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

  if (!toc) return null;

  const { items, reducedMotion } = toc;

  return (
    // Spans the full gutter beside the prose so the rail can sit centred within it
    <nav
      aria-labelledby="toc-heading"
      className="absolute inset-y-0 left-full hidden w-[calc((100cqw-100%)/2)] xl:block"
    >
      <div className="sticky top-10 mx-auto flex max-h-[calc(100vh-5rem)] w-52 flex-col">
        <p id="toc-heading" className="mb-3 text-sm font-semibold text-fg-soft">
          On this page
        </p>
        {/* Only the list scrolls, so the label stays put on posts with many headings */}
        <div className="min-h-0 overflow-y-auto">
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
                      item.level === 2 ? 'pl-5' : 'pl-10 text-xs',
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
      </div>
    </nav>
  );
}
