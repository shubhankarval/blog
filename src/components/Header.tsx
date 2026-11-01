import Link from 'next/link';
import { PORTFOLIO_URL } from '@lib/constants';

interface HeaderProps {
  /** Current page name shown after ~/, e.g. the post slug. */
  crumb?: string;
}

export default function Header({ crumb }: Readonly<HeaderProps>) {
  return (
    <header className="flex items-center justify-between gap-4 sm:text-lg">
      <div className="min-w-0 truncate">
        <Link href="/" className="transition-colors hover:text-primary">
          <span className="font-semibold text-primary">~</span>
          <span>/</span>
        </Link>
        {crumb && <span className="font-code">{crumb}</span>}
      </div>
      <a
        href={PORTFOLIO_URL}
        className="shrink-0 font-code text-sm text-muted transition-colors hover:text-foreground sm:text-base"
      >
        <span className="font-semibold text-primary">@</span>shubhankar
      </a>
    </header>
  );
}
