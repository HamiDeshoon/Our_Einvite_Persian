import { useEffect, useRef } from 'react';
import { invitationConfig } from '../config/invitation.config';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-[80px]"
      style={{
        zIndex: 10,
        background: 'var(--color-ivory)',
        borderTop: '1px solid rgba(183, 110, 121, 0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <div className="section-divider mb-10" />
        <h3
          className="font-display text-[32px] font-bold mb-3"
          style={{ color: 'var(--color-mahogany)' }}
        >
          {invitationConfig.brideName} و {invitationConfig.groomName}
        </h3>

        <p
          className="font-sans text-[15px] font-medium mb-4"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          {invitationConfig.persianDateText}
        </p>

        <p
          className="font-display text-[20px]"
          style={{ color: 'var(--color-rose-gold)' }}
        >
          با یک دنیا عشق و قدردانی ✦
        </p>

        <div className="section-divider my-8" />

        <p
          className="font-sans text-[14px] font-bold uppercase tracking-[0.1em] mb-6"
          style={{ color: 'var(--color-deep-rose)' }}
        >
          سوال یا نیاز به هماهنگی بیشتر؟
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <p className="font-sans text-[16px] font-bold mb-1 text-mahogany">
              {invitationConfig.groomName}
            </p>
            <a
              href="tel:+989106180740"
              className="font-sans text-[15px] font-light dir-ltr inline-block tracking-wide transition-colors duration-300 text-warm-gray hover:text-rose-gold"
            >
              ۰۹۱۰ ۶۱۸ ۰۷۴۰
            </a>
          </div>

          <div
            className="hidden sm:block w-px h-8"
            style={{ background: 'var(--color-blush)' }}
          />

          <div className="text-center">
            <p className="font-sans text-[16px] font-bold mb-1 text-mahogany">
              {invitationConfig.brideName}
            </p>
            <a
              href="tel:+989127241564"
              className="font-sans text-[15px] font-light dir-ltr inline-block tracking-wide transition-colors duration-300 text-warm-gray hover:text-rose-gold"
            >
              ۰۹۱۲ ۷۲۴ ۱۵۶۴
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
