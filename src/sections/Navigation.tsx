import { useEffect, useRef, useState } from 'react';
import { invitationConfig } from '../config/invitation.config';

const NAV_LINKS = [
  { label: 'داستان ما', href: '#our-story' },
  { label: 'برنامه‌های جشن', href: '#the-wedding' },
  { label: 'مکان و آدرس', href: '#location' },
  { label: 'گالری تصاویر', href: '#gallery' },
  { label: 'اعلام حضور', href: '#rsvp' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        height: scrolled ? '58px' : '66px',
        background: scrolled ? 'rgba(254, 253, 251, 0.96)' : 'rgba(254, 253, 251, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(183, 110, 121, 0.2)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(62, 39, 35, 0.08)' : 'none',
      }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-[26px] font-bold tracking-tight"
          style={{ color: 'var(--color-mahogany)' }}
        >
          {invitationConfig.brideName} و {invitationConfig.groomName}
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-sans text-[14px] font-medium transition-colors duration-300 relative"
              style={{ color: 'var(--color-warm-gray)' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-mahogany)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-warm-gray)';
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
