import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function Footer() {
  const { couple, event } = invitationConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 px-4 text-center border-t border-gold/25 luxury-glass mt-12 z-10">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-gold/40 bg-ivory flex items-center justify-center p-2 shadow-gold-glow mb-4">
          <span className="font-shekasteh text-2xl sm:text-3xl text-gold-gradient font-bold leading-normal block select-none">
            {couple.monogramFa}
          </span>
        </div>

        {/* English Cursive & Persian Names */}
        <p className="font-script text-2xl sm:text-3xl text-rose-deep mb-1 font-normal">
          {couple.groomEn} & {couple.brideEn}
        </p>

        <div className="py-2 sm:py-3 overflow-visible">
          <h3 className="font-shekasteh text-4xl sm:text-5xl md:text-6xl text-mahogany font-bold mb-2 text-gold-gradient py-2 leading-[1.8] sm:leading-[2.0] overflow-visible">
            {couple.groom} <span className="font-shekasteh text-2xl sm:text-3xl text-rose-gold mx-2">و</span> {couple.bride}
          </h3>
        </div>

        <p className="text-warm-gray text-xs sm:text-sm font-light mb-4">
          {event.weddingDayText} • {event.venueName}
        </p>

        <div className="inline-flex items-center gap-1.5 text-xs text-rose-deep mb-8">
          <span>با آرزوی بهترین‌ها و لحظاتی سراسر شادمانی</span>
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="p-3 rounded-full luxury-glass border border-gold/40 text-mahogany hover:text-gold-deep hover:bg-gold/10 transition-all shadow-sm group"
          title="بازگشت به ابتدای صفحه"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="mt-8 pt-6 border-t border-gold/15 w-full flex items-center justify-between text-[11px] text-warm-gray/70">
          <span>طراحی کارت دعوت الکترونیک</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>۲۱ شهریور ۱۴۰۵</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
