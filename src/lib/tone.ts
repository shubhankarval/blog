export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

// Tailwind only sees literal class names, so every class is spelled out in full.
export const toneText: Record<Tone, string> = {
  neutral: 'text-muted-primary',
  info: 'text-accent-1',
  success: 'text-accent-2',
  warning: 'text-accent-3',
  danger: 'text-accent-4',
};

export const toneBar: Record<Tone, string> = {
  neutral: 'bg-muted-primary',
  info: 'bg-accent-1',
  success: 'bg-accent-2',
  warning: 'bg-accent-3',
  danger: 'bg-accent-4',
};

export const toneBg: Record<Tone, string> = {
  neutral: 'bg-muted-primary/10',
  info: 'bg-accent-1/10',
  success: 'bg-accent-2/10',
  warning: 'bg-accent-3/10',
  danger: 'bg-accent-4/10',
};

export const toneBorder: Record<Tone, string> = {
  neutral: 'border-muted-primary/45',
  info: 'border-accent-1/45',
  success: 'border-accent-2/45',
  warning: 'border-accent-3/45',
  danger: 'border-accent-4/45',
};
