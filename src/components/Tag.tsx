import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toneBg, toneForTag, toneText } from '@/lib/tone';

interface TagProps {
  name: string;
  href?: string;
  plain?: boolean;
}

export default function Tag({ name, href, plain }: Readonly<TagProps>) {
  const tone = toneForTag(name);

  const className = cn(
    'inline-block rounded-md px-2 py-0.5 font-mono text-xs',
    plain ? 'text-fg-soft' : cn(toneText[tone], toneBg[tone]),
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
