'use client';

import { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import type { TocItem } from '@lib/toc';
import { useActiveHeading } from './useActiveHeading';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

interface TocContextValue {
  items: TocItem[];
  activeIndex: number | null;
  progress: number;
  reducedMotion: boolean;
}

const TocContext = createContext<TocContextValue | null>(null);

/** Null when the post has too few headings to warrant a ToC - consumers render nothing. */
export function useToc() {
  return useContext(TocContext);
}

interface TocProviderProps {
  items: TocItem[];
  children: React.ReactNode;
}

export default function TocProvider({ items, children }: TocProviderProps) {
  const { activeIndex, progress } = useActiveHeading(items);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );

  const value = useMemo(
    () => ({
      items,
      activeIndex,
      progress,
      reducedMotion,
    }),
    [items, activeIndex, progress, reducedMotion]
  );

  if (items.length < 2) return children;

  return <TocContext.Provider value={value}>{children}</TocContext.Provider>;
}
