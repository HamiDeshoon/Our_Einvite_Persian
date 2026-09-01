import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(name1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
    .to(ampersandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .to(name2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.6')
    .to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .to(dateRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5')
    .to(scrollRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-24">
        <div className="max-w-[45%] max-lg:max-w-[70%] max-md:max-w-full">
          <p
            ref={labelRef}
            className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-6 opacity-0 translate-y-4"
            style={{ color: 'var(--color-taupe)' }}
          >
            Together with their families
          </p>

          <h1 className="font-serif font-light leading-[0.95] tracking-[-0.02em]">
            <span
              ref={name1Ref}
              className="block text-[96px] max-lg:text-[72px] max-md:text-[56px] opacity-0 translate-y-6"
              style={{ color: 'var(--color-espresso)' }}
            >
              Fatemeh
            </span>
            <span
              ref={ampersandRef}
              className="block font-serif italic text-[72px] max-lg:text-[56px] max-md:text-[44px] my-1 opacity-0 translate-y-4"
              style={{ color: 'var(--color-gold)' }}
            >
              &amp;
            </span>
            <span
              ref={name2Ref}
              className="block text-[96px] max-lg:text-[72px] max-md:text-[56px] opacity-0 translate-y-6"
              style={{ color: 'var(--color-espresso)' }}
            >
              Hamid
            </span>
          </h1>

          <p
            ref={subRef}
            className="font-sans text-[20px] font-light leading-[1.7] mt-6 max-w-[400px] opacity-0 translate-y-4"
            style={{ color: 'var(--color-taupe)' }}
          >
            request the pleasure of your company at their wedding celebration
          </p>

          <div
            ref={dateRef}
            className="inline-block mt-10 opacity-0 translate-y-4"
          >
            <span
              className="font-serif text-[16px] px-7 py-2.5 rounded-[30px] inline-block"
              style={{
                border: '1px solid rgba(212, 165, 116, 0.5)',
                color: 'var(--color-espresso)',
              }}
            >
              13 August 2026
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 scroll-indicator"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-taupe)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
