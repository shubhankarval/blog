import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TermProps {
  def: string;
  children: ReactNode;
}

export default function Term({ def, children }: Readonly<TermProps>) {
  return (
    <button
      type="button"
      className={cn(
        'group relative inline cursor-help text-left text-foreground',
        'underline decoration-accent-3 decoration-dotted underline-offset-4',
        'focus:outline-none'
      )}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          'invisible absolute bottom-[calc(100%+4px)] left-0 z-20 w-[min(300px,72vw)] opacity-0',
          'rounded-lg border border-[hsl(240_4%_26%)] bg-bg-elevated p-3',
          'text-[13px] leading-relaxed font-normal text-fg-soft shadow-[0_12px_32px_#0009]',
          'transition-opacity',
          'group-hover:visible group-hover:opacity-100',
          'group-focus:visible group-focus:opacity-100'
        )}
      >
        <b className="mb-1 block font-mono text-[10.5px] font-semibold tracking-wider text-accent-3 uppercase">
          Key term
        </b>
        {def}
      </span>
    </button>
  );
}
