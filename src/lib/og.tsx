import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Mirrors the CSS variables in globals.css (Satori can't read them).
const COLORS = {
  background: '#1b1b1f',
  foreground: '#e9e9e4',
  soft: '#c9c9c4',
  primary: '#8ccdd5',
  elevated: '#303034',
};

type OgInput = {
  crumb?: string;
  title: string;
  description: string;
};

async function loadFont(file: string) {
  return fs.readFile(path.join(process.cwd(), 'public/fonts', file));
}

export async function renderOg({ crumb, title, description }: OgInput) {
  const [regular, bold] = await Promise.all([loadFont('consola.ttf'), loadFont('consolab.ttf')]);

  const titleSize = title.length > 60 ? 54 : title.length > 36 ? 60 : 68;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: COLORS.background,
        color: COLORS.foreground,
        fontFamily: 'Consolas',
      }}
    >
      <div style={{ display: 'flex', fontSize: 36 }}>
        <span style={{ color: COLORS.primary, fontWeight: 700 }}>w</span>
        <span>/</span>
        {crumb && <span>{crumb}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.5,
            color: COLORS.soft,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 28,
          borderTop: `2px solid ${COLORS.elevated}`,
          fontSize: 28,
          color: COLORS.soft,
        }}
      >
        <div style={{ display: 'flex' }}>
          <span style={{ color: COLORS.primary, fontWeight: 700 }}>@</span>
          <span>shubhankar</span>
        </div>
        <div style={{ display: 'flex' }}>blog.shubhankarval.dev</div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        {
          name: 'Consolas',
          data: regular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Consolas',
          data: bold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}
