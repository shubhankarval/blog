import type { ReactNode } from 'react';

interface SummaryProps {
  title?: string;
  children: ReactNode;
}

export default function Summary({ title = 'Summary', children }: Readonly<SummaryProps>) {
  return (
    <div className="rounded-[10px] border border-bg-elevated bg-bg-soft px-5 py-4">
      <div className="mb-2 font-mono text-[11px] font-semibold tracking-widest text-primary uppercase">
        {title}
      </div>
      <div className="text-[0.98rem] leading-7 text-fg-soft [&_li+li]:mt-1 [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}
