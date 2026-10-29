import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toneBg, toneForTag, toneText } from '@/lib/tone';

interface TagProps {
  name: string;
  href?: string;
  plain?: boolean;
  variant?: 'tag' | 'label';
}

export default function Tag({ name, href, plain, variant = 'tag' }: Readonly<TagProps>) {
  const tone = toneForTag(name);

  const className = cn(
    variant === 'label'
      ? 'inline-block rounded-sm bg-primary/10 px-1.75 py-px font-mono text-[0.65rem] font-bold tracking-wide text-primary uppercase'
      : cn(
          'inline-block rounded-sm px-2 py-0.5 font-mono text-xs',
          plain ? 'text-fg-soft bg-code' : cn(toneText[tone], toneBg[tone])
        ),
    href && 'hover:brightness-125'
  );
  if (href) {
    return (
      <Link href={href} className={className}>
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
}
