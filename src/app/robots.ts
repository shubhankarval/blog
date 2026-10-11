import type { MetadataRoute } from 'next';
import { SITE_URL } from '@lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Proxied umami endpoints, not real pages
      disallow: ['/analytics.js', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
