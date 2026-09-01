import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'Our Story', href: '#our-story' },
  { label: 'The Wedding', href: '#the-wedding' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: '64px',
        background: 'rgba(250, 246, 241, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(212, 165, 116, 0.3)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-[20px] font-light tracking-tight"
          style={{ color: 'var(--color-espresso)' }}
        >
          Fatemeh &amp; Hamid
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-sans text-[13px] font-normal uppercase tracking-[0.08em] transition-colors duration-300 hover:text-espresso"
              style={{ color: 'var(--color-taupe)' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-espresso)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-taupe)';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
