import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { invitationConfig } from '../config/invitation.config';

export default function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref);

  return (
    <section
      ref={ref}
      id="location"
      className="relative py-20 fade-in"
      style={{ zIndex: 10, background: 'var(--color-ivory)' }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="font-serif italic text-[14px] uppercase tracking-[0.1em] mb-4 text-deep-rose">
            مکان و آدرس برگزاری
          </p>
          <h2
            className="heading-lg mb-6"
            style={{ color: 'var(--color-mahogany)' }}
          >
            مکان برگزاری جشن
          </h2>
          <p
            className="font-sans text-[20px] font-medium mb-2"
            style={{ color: 'var(--color-mahogany)' }}
          >
            {invitationConfig.venueName}
          </p>
          <p
            className="font-sans text-[17px] font-light mb-2"
            style={{ color: 'var(--color-warm-gray)' }}
          >
            {invitationConfig.venueAddress}
          </p>
          <p
            className="font-sans text-[16px] font-medium mb-8"
            style={{ color: 'var(--color-deep-rose)' }}
          >
            زمان: {invitationConfig.persianDateText}
          </p>
        </div>

        <div
          className="glass-card p-3 rounded-2xl overflow-hidden mx-auto shadow-lg"
          style={{ maxWidth: '800px' }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{ aspectRatio: '4/3', maxHeight: '450px' }}
          >
            <iframe
              src={invitationConfig.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="مسیریابی محل برگزاری"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
          <a
            href={invitationConfig.googleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block animated-underline text-rose-gold font-sans text-[15px] font-medium tracking-[0.05em]"
          >
            📍 مشاهده در گوگل مپس (Google Maps)
          </a>
          {invitationConfig.neshanDirectUrl && (
            <a
              href={invitationConfig.neshanDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block animated-underline text-rose-gold font-sans text-[15px] font-medium tracking-[0.05em]"
            >
              🚗 مسیریابی با نشان
            </a>
          )}
          {invitationConfig.baladDirectUrl && (
            <a
              href={invitationConfig.baladDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block animated-underline text-rose-gold font-sans text-[15px] font-medium tracking-[0.05em]"
            >
              🗺️ مسیریابی با بلد
            </a>
          )}
        </div>
      </div>
    </section>
  );
}