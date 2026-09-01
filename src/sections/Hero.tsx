import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function Hero() {
  const { couple, event, media } = invitationConfig;

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 pt-12 pb-16 overflow-hidden">
      {/* Background Hero Image with luxury radial overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={media.heroPoster}
          alt={`${couple.groom} و ${couple.bride}`}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03] scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/60 to-ivory" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(254,253,251,0.85)_80%)]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Emblem */}
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gold/40 luxury-glass flex items-center justify-center shadow-gold-glow animate-pulse-gentle">
            <span className="font-nastaliq text-2xl sm:text-3xl text-gold-gradient font-bold pt-1">
              {couple.monogramFa}
            </span>
          </div>
          <div className="absolute -top-1 -right-1 text-gold-deep animate-spin" style={{ animationDuration: '10s' }}>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
        </div>

        {/* Small Intro Badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full luxury-glass border border-gold/30">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-ping" />
          <span className="text-xs sm:text-sm font-serif text-rose-deep tracking-wider">
            {couple.familyInvitationText}
          </span>
        </div>

        {/* Couple Names in Shekasteh Calligraphy */}
        <h1 className="font-nastaliq text-5xl sm:text-7xl md:text-8xl text-mahogany font-bold mb-3 tracking-wide leading-relaxed text-gold-gradient">
          {couple.groom} <span className="text-3xl sm:text-5xl text-rose-gold mx-2">&</span> {couple.bride}
        </h1>

        {/* Welcome Text */}
        <p className="font-sans text-xs sm:text-base text-mahogany/85 max-w-lg mb-8 leading-relaxed font-light px-2">
          {couple.welcomeText}
        </p>

        {/* Wedding Date Ribbon */}
        <div className="relative rounded-2xl p-0.5 bg-gradient-to-r from-gold/30 via-rose-gold/40 to-gold/30 shadow-luxury mb-10">
          <div className="px-6 py-3 rounded-[calc(1rem-2px)] bg-ivory/95 backdrop-blur-md flex items-center gap-3">
            <Heart className="w-4 h-4 text-rose-gold fill-rose-gold animate-bounce" />
            <span className="font-nastaliq text-lg sm:text-2xl text-mahogany font-semibold pt-1">
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
