import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About Us", "/about"],
  ["Service Areas", "/service-areas"],
  ["Contact", "/#contact"],
];

function NavigationLinks() {
  return links.map(([label, href]) => (
    <Link key={href} href={href} className="nav-item" aria-current={href === "/" ? "page" : undefined}>
      {label}
    </Link>
  ));
}

function RequestLink() {
  return (
    <Link href="/#contact" className="nav-request">
      Request Service
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="hero-header">
      <Link href="/" className="nav-brand" aria-label="Mertin Home Services LLC home">
        <span className="nav-wordmark">Mertin.</span>
        <span className="nav-brand-caption">HOME SERVICES LLC</span>
      </Link>
      <nav className="nav-pill" aria-label="Main navigation">
        <NavigationLinks />
        <RequestLink />
      </nav>
      <details className="mobile-navigation">
        <summary aria-label="Toggle navigation menu">
          <span>Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
        </summary>
        <nav className="mobile-nav-panel" aria-label="Mobile navigation">
          <NavigationLinks />
          <RequestLink />
        </nav>
      </details>
    </header>
  );
}
