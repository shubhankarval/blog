'use client';

import { useEffect, useRef } from 'react';

interface TrackViewProps {
  slug: string;
}

function detectSource(): string {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source');

  if (utmSource) {
    // remove utm_source from URL (no reload)
    params.delete('utm_source');

    const newQuery = params.toString();
    const newUrl =
      window.location.pathname + (newQuery ? `?${newQuery}` : '') + window.location.hash;

    window.history.replaceState({}, '', newUrl);

    return utmSource.toLowerCase();
  }

  if (document.referrer) {
    try {
      const ref = new URL(document.referrer).hostname;

      const domains = ['reddit', 'linkedin'];
      for (const domain of domains) {
        if (ref.includes(domain)) return domain;
      }

      return 'other';
    } catch {
      return 'organic';
    }
  }

  return 'organic';
}

export default function TrackView({ slug }: TrackViewProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!slug) return;

    // strict mode guard (prevents double fire)
    if (hasTracked.current) return;
    hasTracked.current = true;

    // session-level source
    let source = sessionStorage.getItem('source');
    if (!source) {
      source = detectSource();
      sessionStorage.setItem('source', source);
    }

    // unique views = once per session per slug
    const key = `viewed:${slug}`;
    const isUnique = !sessionStorage.getItem(key);
    if (isUnique) sessionStorage.setItem(key, 'true');

    // always increment total views
    fetch('/api/views', {
      method: 'POST',
      body: JSON.stringify({
        slug,
        isUnique,
        source,
      }),
    });
  }, [slug]);

  return null;
}
