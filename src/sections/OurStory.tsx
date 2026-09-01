import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function OurStory() {
  const { story, media, couple } = invitationConfig;
  const [activePolaroid, setActivePolaroid] = useState<number | null>(null);

  const photo1 = media.gallery[0] || {
    id: '1',
    src: '/images/Intivation_pose.jpg',
    title: 'عهد و پیمان عاشقی',
    caption: 'آغاز سرسبزترین فصل با هم بودن',
  };

  const photo2 = media.gallery[1] || {
    id: '2',
    src: '/images/proposal_us.jpg',
    title: 'لحظه شیرین آغاز',
    caption: 'سپردن دست‌های مهر و وفا',
  };

  return (
    <section id="story-section" className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto z-10 overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
            داستان پیوند ما
            <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <h2 className="font-shekasteh text-4xl sm:text-5xl md:text-6xl text-mahogany font-bold mb-4 leading-relaxed">
          به نام پروردگار مهر و آفرینش
        </h2>

        {/* Poetry Card */}
        <div className="luxury-glass rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-luxury mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-gold/15 to-transparent rounded-tr-full pointer-events-none" />

          <p className="font-shekasteh text-2xl sm:text-3xl text-mahogany/95 leading-loose mb-3 text-gold-gradient font-medium">
            {story.quote}
          </p>
          <span className="text-xs font-serif text-rose-deep block">
            {story.quotePoet}
          </span>
        </div>

        <p className="text-warm-gray text-xs sm:text-sm leading-relaxed font-light px-2">
          {story.description}
        </p>
      </div>

      {/* Casual Overlapping Polaroid Duo Showcase */}
      <div className="relative max-w-3xl mx-auto pt-6 pb-12 flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-rose-gold/10 to-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Polaroid 1 (Left / Underneath) */}
        <div
          onMouseEnter={() => setActivePolaroid(1)}
          onMouseLeave={() => setActivePolaroid(null)}
          className={`relative transition-all duration-500 ease-out cursor-pointer ${
            activePolaroid === 1
              ? 'z-30 scale-105 -rotate-1 shadow-[0_25px_60px_-15px_rgba(212,175,55,0.4)]'
              : activePolaroid === 2
              ? 'z-10 -rotate-6 scale-95 opacity-85'
              : 'z-10 -rotate-4 hover:-rotate-1 sm:-rotate-5'
          } w-[240px] xs:w-[270px] sm:w-[320px] -mr-8 sm:-mr-16`}
        >
          {/* Polaroid Card Frame */}
          <div className="bg-[#FAF9F5] p-3 sm:p-4 pb-5 sm:pb-6 rounded-lg shadow-2xl border border-[#E8E4DA] relative overflow-hidden">
            {/* Washi Gold Tape Effect at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 bg-gradient-to-r from-gold/40 via-gold-light/60 to-gold/40 backdrop-blur-sm transform -rotate-2 opacity-80 shadow-sm border border-gold/30 z-20" />

            {/* Photo Container with Polaroid Film Filter */}
            <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-900 rounded-sm mb-3 shadow-inner">
              <img
                src={photo1.src}
                alt={photo1.title}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] sepia-[0.08] saturate-[1.08] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-rose-400/10 mix-blend-soft-light pointer-events-none" />
            </div>

            {/* Handwritten Polaroid Bottom Margin */}
            <div className="text-center px-1">
              <p className="font-shekasteh text-lg sm:text-xl text-mahogany font-bold leading-tight">
                {photo1.title}
              </p>
              <p className="font-script text-xs sm:text-sm text-rose-deep opacity-80 mt-0.5 tracking-wider">
                {couple.groomEn} & {couple.brideEn}
              </p>
            </div>
          </div>
        </div>

        {/* Polaroid 2 (Right / Overlapping by ~40-50%) */}
        <div
          onMouseEnter={() => setActivePolaroid(2)}
          onMouseLeave={() => setActivePolaroid(null)}
          className={`relative transition-all duration-500 ease-out cursor-pointer ${
            activePolaroid === 2
              ? 'z-30 scale-105 rotate-1 shadow-[0_25px_60px_-15px_rgba(183,110,121,0.45)]'
              : activePolaroid === 1
              ? 'z-10 rotate-6 scale-95 opacity-85'
              : 'z-20 rotate-4 hover:rotate-1 sm:rotate-6'
          } w-[240px] xs:w-[270px] sm:w-[320px]`}
        >
          {/* Polaroid Card Frame */}
          <div className="bg-[#FAF9F5] p-3 sm:p-4 pb-5 sm:pb-6 rounded-lg shadow-2xl border border-[#E8E4DA] relative overflow-hidden">
            {/* Washi Rose-Gold Tape Effect at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-6 bg-gradient-to-r from-rose-gold/40 via-rose-blush/60 to-rose-gold/40 backdrop-blur-sm transform rotate-3 opacity-80 shadow-sm border border-rose-gold/30 z-20" />

            {/* Photo Container with Polaroid Film Filter */}
            <div className="relative aspect-[4/4.5] overflow-hidden bg-stone-900 rounded-sm mb-3 shadow-inner">
              <img
                src={photo2.src}
                alt={photo2.title}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] sepia-[0.08] saturate-[1.08] transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-rose-400/10 mix-blend-soft-light pointer-events-none" />
            </div>

            {/* Handwritten Polaroid Bottom Margin */}
            <div className="text-center px-1">
              <p className="font-shekasteh text-lg sm:text-xl text-mahogany font-bold leading-tight">
                {photo2.title}
              </p>
              <p className="font-script text-xs sm:text-sm text-rose-deep opacity-80 mt-0.5 tracking-wider">
                Forever & Always • 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sweet caption hint */}
      <div className="text-center mt-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-rose-deep/80 font-serif">
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
          <span>خاطرات ماندگار آغاز یک پیوند آسمانی</span>
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
        </span>
      </div>
    </section>
  );
}
