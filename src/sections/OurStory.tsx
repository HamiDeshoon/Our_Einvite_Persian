import { Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function OurStory() {
  const { story, media } = invitationConfig;

  return (
    <section id="story-section" className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto z-10">
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

        <h2 className="font-nastaliq text-3xl sm:text-4xl md:text-5xl text-mahogany font-bold mb-4 leading-relaxed">
          به نام پروردگار مهر و آفرینش
        </h2>

        {/* Poetry Card */}
        <div className="luxury-glass rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-luxury mb-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-gold/15 to-transparent rounded-tr-full pointer-events-none" />

          <p className="font-nastaliq text-xl sm:text-2xl text-mahogany/95 leading-loose mb-3 text-gold-gradient font-medium">
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

      {/* 3 Curated Romantic Photos Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {media.gallery.map((item, idx) => (
          <div
            key={item.id}
            className={`group relative rounded-3xl p-1 bg-gradient-to-b from-gold/40 via-champagne-200/40 to-rose-gold/30 shadow-luxury hover:shadow-gold-glow transition-all duration-500 hover:-translate-y-2 ${
              idx === 1 ? 'md:-translate-y-4' : ''
            }`}
          >
            <div className="rounded-[calc(1.5rem-4px)] overflow-hidden bg-ivory flex flex-col h-full">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mahogany/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 right-3 luxury-glass rounded-full px-2.5 py-1 text-[11px] font-medium text-mahogany border border-gold/40 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-gold fill-rose-gold" />
                  <span>۰{idx + 1}</span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5 text-center flex-1 flex flex-col justify-center bg-ivory/95">
                <h4 className="font-nastaliq text-xl text-mahogany font-bold mb-1 pt-1">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-warm-gray leading-relaxed font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
