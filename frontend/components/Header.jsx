import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand" aria-label="Plateworks home">
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#D7263D" />
            <circle cx="32" cy="32" r="21" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="7" fill="#181C1F" />
          </svg>
          <span>Plateworks</span>
        </Link>
        <nav aria-label="Main">
          <Link href="/plans">Plans</Link>
          <Link href="/classes">Classes</Link>
          <Link href="/trainers">Coaches</Link>
        </nav>
      </div>
    </header>
  );
}
