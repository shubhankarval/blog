import type { ReactNode } from 'react';
import { toneBg, toneBorder, toneText, type Tone } from '@/lib/tone';

interface CollapsibleProps {
  title: string;
  tone?: Tone;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Collapsible({
  title,
  tone,
  defaultOpen = false,
  children,
}: Readonly<CollapsibleProps>) {
  const frame = tone
    ? `border-dashed ${toneBorder[tone]} ${toneBg[tone]}`
    : 'border-bg-elevated bg-bg-soft';

  return (
    <details open={defaultOpen} className={`group rounded-[10px] border text-fg-soft ${frame}`}>
      <summary
        className={`flex cursor-pointer list-none items-center gap-2.5 px-5 py-3.5 font-mono text-xs font-semibold tracking-wider uppercase marker:content-none [&::-webkit-details-marker]:hidden ${
          tone ? toneText[tone] : 'text-fg-soft'
        }`}
      >
        {title}
        <span aria-hidden="true" className="ml-auto text-lg leading-none">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="space-y-3 px-5 pb-4.5 leading-7">{children}</div>
    </details>
  );
}
