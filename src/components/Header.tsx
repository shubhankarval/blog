import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/" className="sm:text-lg">
        <span className="font-semibold text-primary">~</span>
        <span>/</span>
      </Link>
    </header>
  );
}
