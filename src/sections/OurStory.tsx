import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { invitationConfig } from '../config/invitation.config';

gsap.registerPlugin(ScrollTrigger);

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const body1Ref = useRef<HTMLParagraphElement>(null);
  const body2Ref = useRef<HTMLParagraphElement>(null);
  const body3Ref = useRef<HTMLParagraphElement>(null);
  const body4Ref = useRef<HTMLParagraphElement>(null);
  const body5Ref = useRef<HTMLParagraphElement>(null);
  const body6Ref = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

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
        ease: 'power3.out',
      })
        .to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power4.out',
          },
          '-=0.5'
        )
        .to(
          body1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          body2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          body3Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          body4Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          body5Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          body6Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          quoteRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="relative py-[140px] max-md:py-[100px]"
      style={{ zIndex: 10, background: 'var(--color-ivory)' }}
    >
      <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
        <p
          ref={labelRef}
          className="font-serif italic text-[15px] uppercase tracking-[0.1em] mb-4 opacity-0 translate-y-4 text-deep-rose"
        >
          داستان آشنایی ما
        </p>

        <h2
          ref={headlineRef}
          className="heading-lg mb-8 opacity-0 translate-y-4"
          style={{ color: 'var(--color-mahogany)' }}
        >
          آغاز یک مسیر مشترک
        </h2>

        <p
          ref={body1Ref}
          className="font-sans text-[18px] font-light leading-[2] mb-6 opacity-0 translate-y-4 text-justify md:text-center"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          بعضی داستان‌ها با اتفاق‌های پیچیده شروع می‌شوند، اما داستان ما با یک گردش ساده دوستانه در درکه آغاز شد.
        </p>

        <p
          ref={body2Ref}
          className="font-sans text-[18px] font-light leading-[2] mb-6 opacity-0 translate-y-4 text-justify md:text-center"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          جمعی از دوستان و هم‌کلاسی‌ها دور هم جمع شده بودند تا تبلور روزهای خوش جوانی را جشن بگیرند. روزی عادی به نظر می‌رسید، اما زندگی همواره زیباترین لحظاتش را در غیرمنتظره‌ترین روزها پنهان می‌کند.
        </p>

        <p
          ref={body3Ref}
          className="font-sans text-[18px] font-light leading-[2] mb-6 opacity-0 translate-y-4 text-justify md:text-center"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          در همان نگاه اول، نگاه‌هایمان گره خورد؛ صدایی آرام در دل زمزمه کرد که این آغاز داستانی متفاوت و ماندگار است.
        </p>

        <p
          ref={body4Ref}
          className="font-sans text-[18px] font-light leading-[2] mb-6 opacity-0 translate-y-4 text-justify md:text-center"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          سال‌هایی که گذشت، مملو از خنده‌ها، چالش‌ها، موفقیت‌ها و تجربه‌هایی بود که کنار هم آموختیم و قد کشیدیم. هر قدم در این راه، ما را به هم نزدیک‌تر ساخت.
        </p>

        <p
          ref={body5Ref}
          className="font-sans text-[18px] font-light leading-[2] mb-6 opacity-0 translate-y-4 text-justify md:text-center"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          و اکنون، پس از فراز و نشیب‌های فراوان، فصل تازه‌ای از زندگی مشترکمان را آغاز می‌کنیم.
        </p>

        <p
          ref={body6Ref}
          className="font-sans text-[18px] font-medium leading-[2] mb-10 opacity-0 translate-y-4"
          style={{ color: 'var(--color-mahogany)' }}
        >
          حضور گرم شما در این جشن، بزرگ‌ترین هدیه و افتخار برای ماست.
        </p>

        <blockquote ref={quoteRef} className="opacity-0 translate-y-4">
          <div className="decorative-line mb-6" />
          <p
            className="font-display text-[34px] max-md:text-[28px] leading-[1.4]"
            style={{ color: 'var(--color-rose-gold)' }}
          >
            {invitationConfig.brideName} و {invitationConfig.groomName}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
