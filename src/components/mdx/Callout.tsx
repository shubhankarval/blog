import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { LuInfo, LuLightbulb, LuOctagonAlert, LuTriangleAlert } from 'react-icons/lu';
import { toneBar, toneBg, toneText, type Tone } from '@/lib/tone';

export type CalloutType = 'note' | 'tip' | 'warning' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  filled?: boolean;
  children: ReactNode;
}

const typeTone: Record<CalloutType, Tone> = {
  note: 'info',
  tip: 'success',
  warning: 'warning',
  danger: 'danger',
};

const defaultTitle: Record<CalloutType, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Danger',
};

const icons: Record<CalloutType, IconType> = {
  note: LuInfo,
  tip: LuLightbulb,
  warning: LuTriangleAlert,
  danger: LuOctagonAlert,
};

export default function Callout({
  type = 'note',
  title,
  filled = false,
  children,
}: Readonly<CalloutProps>) {
  const tone = typeTone[type];
  const Icon = icons[type];

  return (
    <aside
      className={`flex overflow-hidden rounded-r-sm text-fg-soft ${
        filled ? toneBg[tone] : 'bg-bg-soft'
      }`}
    >
      <span className={`w-1.25 shrink-0 ${toneBar[tone]}`} />
      <div className="min-w-0 px-5 py-3.5">
        <div
          className={`mb-0.5 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase ${toneText[tone]}`}
        >
          <Icon aria-hidden="true" className="size-4 shrink-0" />
          {title ?? defaultTitle[type]}
        </div>
        <div className="space-y-3 leading-7">{children}</div>
      </div>
    </aside>
  );
}
