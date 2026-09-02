import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function Hero() {
  const { couple, event, media } = invitationConfig;

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-10 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Hero Image with luxury radial overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={asset(media.heroPoster)}
          alt={`${couple.groom} و ${couple.bride}`}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/65 to-ivory" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(254,253,251,0.88)_80%)]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
        {/* Monogram Emblem */}
        <div className="relative mb-4 sm:mb-6">
          <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-full border border-gold/40 luxury-glass flex items-center justify-center p-2 shadow-gold-glow animate-pulse-gentle">
            <span className="font-shekasteh text-3xl sm:text-4xl text-gold-gradient font-bold leading-normal block select-none">
              {couple.monogramFa}
            </span>
          </div>
          <div className="absolute -top-1 -right-1 text-gold-deep animate-spin" style={{ animationDuration: '10s' }}>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
        </div>

        {/* Small Intro Badge */}
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full luxury-glass border border-gold/30">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-ping" />
          <span className="text-[11px] sm:text-xs font-serif text-rose-deep tracking-wider">
            {couple.familyInvitationText}
          </span>
        </div>

        {/* English Handwriting Script Title Above */}
        <p className="font-script text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-rose-deep tracking-wider mb-1 font-normal drop-shadow-sm select-none">
          {couple.groomEn} & {couple.brideEn}
        </p>

        {/* Bold Persian Calligraphy with Shekasteh V2 - Generous Clearance */}
        <div className="my-2 sm:my-4 py-4 sm:py-6 w-full overflow-visible">
          <h1 className="font-shekasteh text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-mahogany font-bold tracking-normal leading-[1.8] sm:leading-[2.1] text-gold-gradient drop-shadow-[0_4px_16px_rgba(212,175,55,0.2)] overflow-visible">
            {couple.groom} <span className="font-shekasteh text-3xl xs:text-4xl sm:text-6xl text-rose-gold mx-1.5 sm:mx-3">و</span> {couple.bride}
          </h1>
        </div>

        {/* Welcome Text */}
        <p className="font-sans text-xs sm:text-base text-mahogany/85 max-w-lg mb-8 leading-relaxed font-light px-2">
          {couple.welcomeText}
        </p>

        {/* Wedding Date Ribbon */}
        <div className="relative rounded-2xl p-0.5 bg-gradient-to-r from-gold/30 via-rose-gold/40 to-gold/30 shadow-luxury mb-10 overflow-visible">
          <div className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-[calc(1rem-2px)] bg-ivory/95 backdrop-blur-md flex items-center gap-3">
            <Heart className="w-4 h-4 text-rose-gold fill-rose-gold animate-bounce" />
            <span className="font-shekasteh text-xl sm:text-2xl text-mahogany font-semibold pt-1 leading-normal">
              {event.weddingDayText}
            </span>
            <span className="text-xs text-warm-gray font-light">|</span>
            <span className="text-xs sm:text-sm text-warm-gray font-medium">
              {event.timeText}
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToStory}
          className="group flex flex-col items-center gap-1.5 text-warm-gray hover:text-mahogany transition-colors"
        >
          <span className="text-[11px] font-medium tracking-widest text-rose-deep">مشاهده جزئیات دعوت‌نامه</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-gold-deep group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
