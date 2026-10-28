import Link from 'next/link';

interface HeaderProps {
  /** Current page name shown after ~/, e.g. the post slug. */
  crumb?: string;
}

export default function Header({ crumb }: HeaderProps) {
  return (
    <header className="sm:text-lg">
      <Link href="/" className="transition-colors hover:text-primary">
        <span className="font-semibold text-primary">~</span>
        <span>/</span>
      </Link>
      {crumb && <span className="font-code">{crumb}</span>}
    </header>
  );
}
