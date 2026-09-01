import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Hint fade out after 3s or on scroll
      const hintTl = gsap.to(hintRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 3,
        ease: 'power2.out',
      });

      // Reduce overlay opacity when gallery section is active
      const overlay = document.getElementById('gallery-overlay');
      if (overlay) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            overlay.style.opacity = '0.45';
          },
          onLeave: () => {
            overlay.style.opacity = '1';
          },
          onEnterBack: () => {
            overlay.style.opacity = '0.45';
          },
          onLeaveBack: () => {
            overlay.style.opacity = '1';
          },
        });
      }

      // Kill hint animation on first scroll
      const killHint = () => {
        hintTl.kill();
        if (hintRef.current) {
          gsap.to(hintRef.current, { opacity: 0, duration: 0.3 });
        }
      };

      window.addEventListener('wheel', killHint, { once: true });

      return () => {
        window.removeEventListener('wheel', killHint);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-[120px] max-md:py-[80px]"
      style={{ zIndex: 10, background: 'transparent' }}
    >
      <div
        ref={contentRef}
        className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center opacity-0 translate-y-[30px]"
      >
        <p
          className="font-serif italic text-[14px] uppercase tracking-[0.08em] mb-4"
          style={{ color: 'var(--color-gold)' }}
        >
          A Glimpse of Us
        </p>

        <h2
          className="font-serif text-[56px] max-md:text-[40px] font-light tracking-[-0.02em] mb-5"
          style={{
            color: 'var(--color-espresso)',
            textShadow: '0 2px 20px rgba(250, 246, 241, 0.8)',
          }}
        >
          Moments &amp; Memories
        </h2>

        <p
          className="font-sans text-[18px] font-light mb-8"
          style={{
            color: 'var(--color-taupe)',
            textShadow: '0 1px 10px rgba(250, 246, 241, 0.8)',
          }}
        >
          Scroll to wander through our favorite moments together.
        </p>

        <div
          ref={hintRef}
          className="inline-flex items-center gap-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-taupe)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="3" width="12" height="18" rx="6" />
            <line x1="12" y1="7" x2="12" y2="10" />
          </svg>
          <span
            className="font-sans text-[14px] font-light"
            style={{ color: 'var(--color-taupe)' }}
          >
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
