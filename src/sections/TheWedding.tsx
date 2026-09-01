import { Sparkles, Heart, Utensils, Clock } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function TheWedding() {
  const { schedule } = invitationConfig;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-gold-deep" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-gold fill-rose-gold/20" />;
      case 'utensils':
        return <Utensils className="w-5 h-5 text-gold-deep" />;
      default:
        return <Clock className="w-5 h-5 text-rose-gold" />;
    }
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-gold" />
            برنامه زمانی مراسم
            <Clock className="w-3.5 h-3.5 text-rose-gold" />
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <h2 className="font-nastaliq text-3xl sm:text-4xl md:text-5xl text-mahogany font-bold mb-3 leading-relaxed">
          جدول زمانی شب وصال
        </h2>
        <p className="text-warm-gray text-xs sm:text-sm font-light">
          لحظه‌به‌لحظه در کنار شما خاطره می‌سازیم
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Central Glowing Line (hidden on small mobile, visible on sm+) */}
        <div className="hidden sm:block absolute top-6 bottom-6 right-1/2 translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />

        <div className="flex flex-col gap-6 sm:gap-10">
          {schedule.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.time}
                className={`relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full sm:w-1/2">
                  <div className="group rounded-3xl p-0.5 bg-gradient-to-b from-gold/35 via-champagne-200/40 to-rose-gold/25 shadow-luxury hover:shadow-gold-glow transition-all duration-300">
                    <div className="rounded-[calc(1.5rem-2px)] bg-ivory/95 backdrop-blur-md p-5 sm:p-6 border border-white/80">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-katibeh text-xl sm:text-2xl font-bold text-rose-deep bg-rose-silk px-3 py-0.5 rounded-full border border-rose-gold/20">
                          {item.timeFa}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center border border-gold/20 group-hover:scale-110 transition-transform">
                          {getIcon(item.icon)}
                        </div>
                      </div>

                      <h3 className="font-nastaliq text-xl sm:text-2xl text-mahogany font-bold mb-1.5 pt-1 text-gold-gradient">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-warm-gray leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Center Node Badge */}
                <div className="hidden sm:flex relative z-20 w-10 h-10 rounded-full bg-ivory border-2 border-gold items-center justify-center shadow-gold-glow">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-gold to-rose-gold animate-pulse" />
                </div>

                {/* Empty half on desktop for alternating balance */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
