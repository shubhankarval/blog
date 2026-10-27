import type { ReactNode } from 'react';
import NextImage from 'next/image';

interface FigureProps {
  src?: string;
  alt?: string;
  label?: string;
  caption?: ReactNode;
  children?: ReactNode;
}

export default function Figure({ src, alt = '', label, caption, children }: Readonly<FigureProps>) {
  const hasCaption = Boolean(label || caption);

  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-bg-elevated bg-bg-soft">
        {src ? (
          <NextImage src={src} alt={alt} width={2000} height={2000} className="h-auto w-full" />
        ) : (
          <div className="grid place-items-center p-5 text-muted [&_svg]:h-auto [&_svg]:max-w-full">
            {children}
          </div>
        )}
      </div>
      {hasCaption && (
        <figcaption className="mt-2.5 text-center text-sm leading-normal text-muted">
          {label && <b className="mr-1.5 font-mono text-xs font-semibold text-fg-soft">{label}</b>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
