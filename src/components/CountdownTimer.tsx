import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { invitationConfig } from '../config/invitation.config';

gsap.registerPlugin(ScrollTrigger);

// Helper to convert numbers to Persian digits
const toPersianDigits = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .padStart(2, '0')
    .replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

export default function CountdownTimer({
  targetDate = invitationConfig.gregorianDate,
}: {
  targetDate?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => {
      const now = Date.now();
      const diff = target - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  useEffect(() => {
    if (!boxesRef.current) return;

    const ctx = gsap.context(() => {
      const boxes = boxesRef.current?.querySelectorAll('.countdown-box');
      if (boxes) {
        gsap.to(Array.from(boxes), {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: boxesRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, boxesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="my-14 text-center fade-in px-4"
      style={{ color: 'var(--color-mahogany)' }}
    >
      <p className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-2 text-deep-rose">
        شمارش معکوس
      </p>
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
        روزشماری تا آغاز جشن پیوند
      </h2>
      <div ref={boxesRef} className="flex justify-center gap-3 mt-6 dir-rtl">
        {[
          { value: toPersianDigits(days), label: 'روز' },
          { value: toPersianDigits(hours), label: 'ساعت' },
          { value: toPersianDigits(minutes), label: 'دقیقه' },
          { value: toPersianDigits(seconds), label: 'ثانیه' },
        ].map((item) => (
          <div
            key={item.label}
            className="countdown-box"
            style={{ opacity: 0, transform: 'scale(0.85) translateY(12px)' }}
          >
            <div className="font-sans text-2xl font-bold">{item.value}</div>
            <div className="countdown-label text-[13px]">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
