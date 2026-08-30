'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '@lib/utils';
import { useToc } from './TocProvider';

interface TocBarProps {
  /** 'top' pins above the header and bleeds past the page gutter; 'inline' sits in the column. */
  variant: 'top' | 'inline';
  className?: string;
}

export default function TocBar({ variant, className }: TocBarProps) {
  const toc = useToc();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Both variants are mounted at once, so the panel id has to be instance-scoped
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    // pointerdown rather than click, so tapping the trigger toggles once instead of closing
    // here and reopening on the trigger's own handler
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  if (!toc) return null;

  const { items, activeIndex, progress, reducedMotion } = toc;
  const inset = variant === 'top' ? 'px-6' : 'px-0';

  // Above the first heading nothing is active yet, but the row still has to name a section
  const current = items[activeIndex ?? 0];

  return (
    <div
      ref={rootRef}
      className={cn(
        'sticky top-0 z-20 border-b border-bg-elevated bg-background/85 backdrop-blur',
        variant === 'top' && '-mx-6',
        className
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center gap-2 text-left text-sm',
          inset,
          variant === 'top' ? 'py-2.5' : 'py-3'
        )}
      >
        <span className="flex-none text-muted">On this page</span>
        <span className="flex-1 truncate font-medium">{current?.text}</span>
        <LuChevronRight
          aria-hidden
          className={cn(
            'size-4 flex-none text-muted',
            !reducedMotion && 'transition-transform duration-200 ease-out',
            open && 'rotate-90'
          )}
        />
      </button>

      {/* Overlays instead of taking up flow: a panel that grows in flow pushes every heading below it down, so anchor links land short once it collapses again. */}
      <div
        className={cn(
          'absolute inset-x-0 top-full grid',
          !reducedMotion && 'transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <nav
            id={panelId}
            aria-label="On this page"
            inert={!open}
            className={cn(
              'max-h-[50vh] overflow-y-auto border-y border-bg-elevated bg-bg-soft py-1.5',
              inset
            )}
          >
            <ul>
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={`${item.id}-${index}`}>
                    <a
                      href={`#${item.id}`}
                      title={item.text}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'block truncate border-l-2 py-1.5 transition-colors hover:text-fg-soft',
                        item.level === 2 ? 'pl-3 text-sm' : 'pl-8 text-xs',
                        isActive
                          ? 'border-primary font-medium text-foreground'
                          : 'border-transparent text-muted'
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div
        aria-hidden
        className={cn(
          'h-0.5 bg-primary',
          !reducedMotion && 'transition-[width] duration-100 ease-out'
        )}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
