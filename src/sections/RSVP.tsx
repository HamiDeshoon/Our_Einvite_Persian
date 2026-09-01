import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RSVP_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEET_URL || '';

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [attending, setAttending] = useState<'accept' | 'decline' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = formRef.current?.querySelectorAll('.form-animate');
      if (elements) {
        gsap.to(Array.from(elements), {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const form = formRef.current;
      if (!form) return;

      const body = {
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
        guests: (form.elements.namedItem('guests') as HTMLSelectElement).value,
        attending: attending || '',
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        website: (form.elements.namedItem('website') as HTMLInputElement).value,
      };

      if (!RSVP_ENDPOINT) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSubmitted(true);
        return;
      }

      const res = await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`خطای پاسخ سرور: ${res.status}`);

      setSubmitted(true);
    } catch {
      setError('مشکلی در ثبت اطلاعات رخ داد. لطفاً مجدداً تلاش کنید یا مستقیماً با ما تماس بگیرید.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-[180px] max-md:py-[120px]"
      style={{ zIndex: 10, background: 'var(--color-champagne)' }}
    >
      <div className="max-w-[600px] mx-auto px-6">
        <p className="form-animate font-serif italic text-[15px] uppercase tracking-[0.1em] text-center mb-4 opacity-0 translate-y-4 text-deep-rose">
          اعلام حضور (RSVP)
        </p>

        <h2
          className="form-animate heading-lg text-center mb-3 opacity-0 translate-y-4"
          style={{ color: 'var(--color-mahogany)' }}
        >
          آیا افتخار حضور می‌دهید؟
        </h2>

        <p
          className="form-animate font-sans text-[16px] font-light text-center mb-12 opacity-0 translate-y-4"
          style={{ color: 'var(--color-warm-gray)' }}
        >
          لطفاً جهت برنامه‌ریزی بهتر، حضور گرمتان را اطلاع دهید.
        </p>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <input
                name="name"
                type="text"
                placeholder="نام و نام خانوادگی"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <input
                name="email"
                type="email"
                placeholder="آدرس ایمیل (اختیاری)"
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <input
                name="phone"
                type="tel"
                placeholder="شماره تماس (مثال: ۰۹۱۲۱۲۳۴۵۶۷)"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <select
                name="guests"
                required
                className="underline-input cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>
                  تعداد همراهان
                </option>
                <option value="1">۱ نفر (خودم)</option>
                <option value="2">۲ نفر (همراه ۱ نفر)</option>
                <option value="3">۳ نفر (همراه ۲ نفر)</option>
                <option value="4">۴ نفر (همراه ۳ نفر)</option>
                <option value="5">۵ نفر یا بیشتر</option>
              </select>
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <p
                className="font-sans text-[15px] font-medium mb-4 text-center md:text-right"
                style={{ color: 'var(--color-warm-gray)' }}
              >
                وضعیت حضور شما:
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => setAttending('accept')}
                  className={`rsvp-pill ${attending === 'accept' ? 'selected' : ''}`}
                >
                  🌸 با کمال میل حضور می‌یابم
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('decline')}
                  className={`rsvp-pill ${attending === 'decline' ? 'selected' : ''}`}
                >
                  💐 متأسفانه امکان حضور ندارم
                </button>
              </div>
            </div>

            <div className="form-animate opacity-0 translate-y-4 scale-95">
              <textarea
                name="message"
                placeholder="پیام تبریک یا یادداشت شما برای عروس و داماد..."
                rows={3}
                className="underline-input resize-none"
              />
            </div>

            {/* Honeypot */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {error && (
              <p
                className="form-animate font-sans text-[14px] text-center -mt-4"
                style={{ color: 'var(--color-deep-rose)' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !attending}
              className="form-animate font-sans text-[17px] font-bold py-4 rounded-full transition-all duration-300 opacity-0 translate-y-4 scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: submitting ? 'var(--color-rose-gold)' : 'var(--color-mahogany)',
                color: 'var(--color-ivory)',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  (e.target as HTMLElement).style.background = 'var(--color-deep-rose)';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  (e.target as HTMLElement).style.background = 'var(--color-mahogany)';
                }
              }}
            >
              {submitting ? 'در حال ثبت اطلاعات...' : 'ثبت و ارسال پاسخ'}
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto mb-6"
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-rose-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3
              className="font-serif text-[32px] font-bold mb-3"
              style={{ color: 'var(--color-mahogany)' }}
            >
              پاسخ شما با موفقیت ثبت شد!
            </h3>
            <p
              className="font-sans text-[17px] font-light max-w-[400px] mx-auto leading-[1.8]"
              style={{ color: 'var(--color-warm-gray)' }}
            >
              {attending === 'accept'
                ? 'بی‌صبرانه مشتاق دیدار و جشن و سرور با شما عزیزان هستیم!'
                : 'جای شما خالی خواهد بود؛ از پیام محبت‌آمیزتان بسیار سپاسگزاریم.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
