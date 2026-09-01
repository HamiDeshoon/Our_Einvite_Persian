import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [attending, setAttending] = useState<'accept' | 'decline' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = formRef.current?.querySelectorAll('.form-animate');
      if (elements) {
        gsap.to(Array.from(elements), {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
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
    setSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-[160px] max-md:py-[100px]"
      style={{ zIndex: 10, background: 'var(--color-cream)' }}
    >
      <div className="max-w-[560px] mx-auto px-6">
        <p
          className="form-animate font-serif italic text-[14px] uppercase tracking-[0.08em] text-center mb-4 opacity-0 translate-y-4"
          style={{ color: 'var(--color-gold)' }}
        >
          RSVP
        </p>

        <h2
          className="form-animate font-serif text-[56px] max-md:text-[40px] font-light tracking-[-0.02em] text-center mb-3 opacity-0 translate-y-4"
          style={{ color: 'var(--color-espresso)' }}
        >
          Will You Be There?
        </h2>

        <p
          className="form-animate font-sans text-[16px] font-light text-center mb-12 opacity-0 translate-y-4"
          style={{ color: 'var(--color-taupe)' }}
        >
          Please let us know by July 15th, 2026
        </p>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="form-animate opacity-0 translate-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4">
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="underline-input"
              />
            </div>

            <div className="form-animate opacity-0 translate-y-4">
              <select
                required
                className="underline-input cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>Number of Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
              </select>
            </div>

            <div className="form-animate opacity-0 translate-y-4">
              <p
                className="font-sans text-[14px] font-normal uppercase tracking-[0.05em] mb-4"
                style={{ color: 'var(--color-taupe)' }}
              >
                Will you be attending?
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAttending('accept')}
                  className={`rsvp-pill ${attending === 'accept' ? 'selected' : ''}`}
                >
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('decline')}
                  className={`rsvp-pill ${attending === 'decline' ? 'selected' : ''}`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            <div className="form-animate opacity-0 translate-y-4">
              <textarea
                placeholder="Leave a message for the couple..."
                rows={3}
                className="underline-input resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !attending}
              className="form-animate font-serif text-[16px] uppercase tracking-[0.08em] py-4 rounded transition-all duration-300 opacity-0 translate-y-4 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: submitting ? 'var(--color-gold)' : 'var(--color-espresso)',
                color: 'var(--color-cream)',
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  (e.target as HTMLElement).style.background = 'var(--color-gold)';
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  (e.target as HTMLElement).style.background = 'var(--color-espresso)';
                }
              }}
            >
              {submitting ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto mb-6"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3
              className="font-serif text-[32px] font-light mb-3"
              style={{ color: 'var(--color-espresso)' }}
            >
              Thank You!
            </h3>
            <p
              className="font-sans text-[16px] font-light"
              style={{ color: 'var(--color-taupe)' }}
            >
              {attending === 'accept'
                ? 'We are so excited to celebrate with you!'
                : 'You will be missed. Thank you for letting us know.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
