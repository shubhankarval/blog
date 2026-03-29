'use client';

import { useEffect, useRef } from 'react';

interface TrackViewProps {
  slug: string;
}

export default function TrackView({ slug }: TrackViewProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!slug) return;

    // prevent double execution (STRICT MODE FIX)
    if (hasTracked.current) return;
    hasTracked.current = true;

    const key = `viewed:${slug}`;

    // unique views = once per session
    const isUnique = !sessionStorage.getItem(key);
    if (isUnique) sessionStorage.setItem(key, 'true');

    // always increment total views
    fetch('/api/views', {
      method: 'POST',
      body: JSON.stringify({ slug, isUnique }),
    });
  }, [slug]);

  return null;
}
