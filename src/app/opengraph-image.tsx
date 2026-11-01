import { SITE_DESCRIPTION } from '@lib/constants';
import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from '@lib/og';

export const alt = "Shubhankar's Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    title: 'my blog.',
    description: SITE_DESCRIPTION,
  });
}
