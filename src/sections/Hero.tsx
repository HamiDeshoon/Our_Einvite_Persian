import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { asset } from '../lib/assets';
import { invitationConfig } from '../config/invitation.config';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const name1Ref = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const name2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
    })
      .to(
        name1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
        },
        '-=0.7'
      )
      .to(
        ampersandRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.6'
      )
      .to(
        name2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
        },
        '-=0.6'
      )
      .to(
        subRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        dateRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
        },
        '-=0.4'
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(name1Ref.current, {
        x: x * 0.5,
        y: y * 0.3,
        duration: 1.5,
        ease: 'power2.out',
      });
      gsap.to(name2Ref.current, {
        x: -x * 0.3,
        y: -y * 0.2,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={asset(invitationConfig.videos.heroPoster)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.9) contrast(1.1)' }}
      >
        <source src={asset(invitationConfig.videos.heroBg)} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="hero-video-overlay" />

      <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-8 py-24 relative z-10 text-right">
        <div className="max-w-[55%] max-lg:max-w-[85%] max-md:max-w-full">
          <p
            ref={labelRef}
            className="font-sans text-[15px] font-medium uppercase tracking-[0.1em] mb-6 opacity-0 translate-y-4"
            style={{ color: 'var(--color-deep-rose)' }}
          >
            {invitationConfig.familyInvitationText}
          </p>

          <h1 className="font-serif leading-[1.05] mb-6">
            <span
              ref={name1Ref}
              className="block heading-xl opacity-0 translate-y-8"
              style={{
                color: 'var(--color-mahogany)',
                textShadow: '0 2px 30px rgba(254, 253, 251, 0.8)',
              }}
            >
              {invitationConfig.brideName}
            </span>
            <span
              ref={ampersandRef}
              className="block font-display text-[76px] max-lg:text-[58px] max-md:text-[44px] my-2 opacity-0 scale-90"
              style={{
                color: 'var(--color-rose-gold)',
                transform: 'scale(0.9) rotate(-3deg)',
              }}
            >
              و
            </span>
            <span
              ref={name2Ref}
              className="block heading-xl opacity-0 translate-y-8"
              style={{
                color: 'var(--color-mahogany)',
                textShadow: '0 2px 30px rgba(254, 253, 251, 0.8)',
              }}
            >
              {invitationConfig.groomName}
            </span>
          </h1>

          <p
            ref={subRef}
            className="font-sans text-[19px] font-light leading-[1.9] mt-6 max-w-[460px] opacity-0 translate-y-4"
            style={{ color: 'var(--color-warm-gray)' }}
          >
            {invitationConfig.welcomeText}
          </p>

          <div
            ref={dateRef}
            className="inline-block mt-10 opacity-0 translate-y-4 scale-95"
          >
            <span
              className="font-sans text-[16px] font-medium px-8 py-3.5 rounded-full inline-block glass-card"
              style={{
                color: 'var(--color-mahogany)',
              }}
            >
              ✦ {invitationConfig.persianDateText} ✦
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 scroll-indicator cursor-pointer text-center"
        onClick={() => {
          const story = document.getElementById('our-story');
          story?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-rose-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <p className="font-sans text-[12px] mt-2 text-warm-gray font-medium">
          ورود به جشن
        </p>
      </div>
    </section>
  );
}
