import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { invitationConfig } from '../config/invitation.config';

gsap.registerPlugin(ScrollTrigger);

export default function TheWedding() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const DETAIL_CARDS = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      title: 'تاریخ برگزاری',
      detail: invitationConfig.weddingDayText,
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'ساعت آغاز مراسم',
      detail: 'ساعت ۱۸:۰۰ (۶ عصر)',
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'محل برگزاری',
      detail: `${invitationConfig.venueName} — ${invitationConfig.city}`,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power4.out',
      }).to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.5'
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        tl.to(
          Array.from(cards),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'back.out(1.2)',
          },
          '-=0.4'
        );
      }

      tl.to(
        btnRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="the-wedding"
      className="relative py-[140px] max-md:py-[100px]"
      style={{ zIndex: 10, background: 'var(--color-champagne)' }}
    >
      <div className="section-divider mb-[100px] max-md:mb-[60px]" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <p
          ref={labelRef}
          className="font-serif italic text-[15px] uppercase tracking-[0.1em] text-center mb-4 opacity-0 translate-y-4"
          style={{ color: 'var(--color-rose-gold)' }}
        >
          جزئیات جشن پیوند
        </p>

        <h2
          ref={headlineRef}
          className="heading-lg text-center mb-16 opacity-0 translate-y-4"
          style={{ color: 'var(--color-mahogany)' }}
        >
          همراه با ما در جشن سرور و شادی
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-3 max-md:grid-cols-1 gap-10 max-md:gap-8 mb-12"
        >
          {DETAIL_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="text-center opacity-0 translate-y-[60px] scale-95"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="glass-card p-8 h-full">
                <div
                  className="inline-flex items-center justify-center mb-6 w-16 h-16 rounded-full"
                  style={{
                    color: 'var(--color-rose-gold)',
                    background: 'rgba(183, 110, 121, 0.1)',
                  }}
                >
                  {card.icon}
                </div>
                <h3
                  className="font-serif text-[22px] font-bold mb-4"
                  style={{ color: 'var(--color-mahogany)' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-sans text-[16px] font-light leading-[1.7]"
                  style={{ color: 'var(--color-warm-gray)' }}
                >
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            ref={btnRef}
            onClick={() => setShowSchedule(!showSchedule)}
            className="animated-underline font-sans text-[16px] font-medium tracking-[0.05em] opacity-0 translate-y-4 bg-transparent border-none cursor-pointer text-mahogany"
          >
            {showSchedule ? '▲ پنهان کردن کنداکتور مراسم' : '▼ مشاهده زمان‌بندی کامل برنامه‌ها'}
          </button>

          {showSchedule && (
            <div className="mt-10 max-w-[650px] mx-auto text-right p-8 md:p-10 rounded-2xl glass-card">
              <h3 className="font-serif text-[20px] font-bold mb-6 text-center text-mahogany">
                زمان‌بندی برنامه‌های جشن
              </h3>
              {invitationConfig.timeline.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 py-4"
                  style={{
                    borderBottom:
                      i < invitationConfig.timeline.length - 1
                        ? '1px solid rgba(183, 110, 121, 0.15)'
                        : 'none',
                  }}
                >
                  <span
                    className="font-sans text-[17px] font-bold min-w-[90px] text-rose-gold"
                  >
                    {item.time}
                  </span>
                  <div>
                    <h4 className="font-sans text-[17px] font-bold mb-1 text-mahogany">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[15px] font-light text-warm-gray">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
