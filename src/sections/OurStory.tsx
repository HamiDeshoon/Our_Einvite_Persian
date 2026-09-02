import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';
import { asset } from '../lib/assets';

export default function OurStory() {
  const { story, media, couple } = invitationConfig;
  const [isTilted, setIsTilted] = useState(false);

  // Centerpiece curated Polaroid photo
  const photo = media.gallery[0] || {
    id: '1',
    src: '/images/proposal_us.jpg',
    title: 'لحظه شیرین آغاز',
    caption: 'سپردن دست‌های مهر و وفا برای ساختن فردایی روشن و جاودانه',
  };

  return (
    <section id="story-section" className="relative py-14 sm:py-24 px-4 max-w-4xl mx-auto z-10 overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
            داستان پیوند ما
            <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
          </span>
          <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <h2 className="font-shekasteh text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-mahogany font-bold mb-4 leading-relaxed">
          به نام پروردگار مهر و آفرینش
        </h2>

        {/* Poetry Card with generous clearance */}
        <div className="luxury-glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-luxury mb-6 text-center relative overflow-visible">
          <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-gold/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tr from-rose-gold/15 to-transparent rounded-tr-full pointer-events-none" />

          <p className="font-shekasteh text-2xl xs:text-3xl sm:text-4xl text-mahogany/95 leading-[2.2] sm:leading-[2.5] mb-2 sm:mb-3 text-gold-gradient font-medium py-2">
            {story.quote}
          </p>
          <span className="text-[11px] sm:text-xs font-serif text-rose-deep block">
            {story.quotePoet}
          </span>
        </div>

        <p className="text-warm-gray text-xs sm:text-sm leading-relaxed font-light px-2">
          {story.description}
        </p>
      </div>

      {/* Iconic Centerpiece Polaroid Keepsake */}
      <div className="relative max-w-sm sm:max-w-md mx-auto pt-4 pb-8 flex items-center justify-center">
        {/* Soft background aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold/15 via-rose-gold/15 to-gold/15 rounded-full blur-2xl pointer-events-none -z-10" />

        <div
          onClick={() => setIsTilted(!isTilted)}
          onMouseEnter={() => setIsTilted(true)}
          onMouseLeave={() => setIsTilted(false)}
          className={`relative transition-all duration-500 ease-out cursor-pointer select-none w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] ${
            isTilted
              ? 'scale-105 rotate-0 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.45)]'
              : '-rotate-2 sm:-rotate-3 hover:rotate-0 hover:scale-102 shadow-2xl'
          }`}
        >
          {/* Polaroid Frame */}
          <div className="bg-[#FAF9F5] p-3.5 sm:p-4 pb-6 sm:pb-8 rounded-xl shadow-2xl border border-[#E8E4DA] relative overflow-hidden">
            {/* Washi Gold Foil Tape at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 bg-gradient-to-r from-gold/40 via-gold-light/60 to-gold/40 backdrop-blur-sm transform -rotate-1 opacity-85 shadow-sm border border-gold/30 z-20" />

            {/* Photo Container with Warm Polaroid Film Glow */}
            <div className="relative aspect-[4/4.8] overflow-hidden bg-stone-900 rounded-sm mb-3.5 shadow-inner">
              <img
                src={asset(photo.src)}
                alt={photo.title}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] sepia-[0.08] saturate-[1.08] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-rose-400/10 mix-blend-soft-light pointer-events-none" />
            </div>

            {/* Handwritten Polaroid Bottom Margin */}
            <div className="text-center px-1 pt-1 pb-1">
              <p className="font-shekasteh text-2xl sm:text-3xl text-mahogany font-bold leading-normal pt-1">
                {photo.title}
              </p>
              <p className="font-script text-sm sm:text-base text-rose-deep opacity-85 mt-1 tracking-wider">
                {couple.groomEn} & {couple.brideEn} • 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative caption */}
      <div className="text-center mt-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-rose-deep/80 font-serif">
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
          <span>{photo.caption}</span>
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
        </span>
      </div>
    </section>
  );
}
