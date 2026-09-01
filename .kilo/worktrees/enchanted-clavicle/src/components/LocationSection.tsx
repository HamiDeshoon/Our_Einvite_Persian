import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref);

  return (
    <section
      ref={ref}
      id="location"
      className="relative py-12 bg-[var(--color-cream)] fade-in"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl text-[var(--color-espresso)] mb-4">
          Wedding Location
        </h2>
        <p className="font-sans text-lg text-[var(--color-taupe)] mb-2">
          Shahdokht Wedding Hall, Ahmadabad Mostofi, Tehran
        </p>
        <p className="font-sans text-lg text-[var(--color-taupe)] mb-4">
          13 August 2026, 6:00 PM
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Shahdokht+Wedding+Hall+Tehran"
          target="_blank"
          rel="noopener noreferrer"
          className="animated-underline text-[var(--color-gold)]"
        >
          View on Google Maps
        </a>
      </div>
    </section>
  );
}
