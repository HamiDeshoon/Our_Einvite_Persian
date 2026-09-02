import { useState } from 'react';
import { Copy, Check, Gift, CreditCard, Landmark, Sparkles, Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function GiftSection() {
  const { giftInfo, couple } = invitationConfig;
  const [copiedField, setCopiedField] = useState<'card' | 'shaba' | 'all' | null>(null);

  const copyToClipboard = async (text: string, field: 'card' | 'shaba' | 'all') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const copyAllInfo = () => {
    const fullText = `هدیه و شادباش پیوند ${couple.groom} و ${couple.bride}\nبانک: ${giftInfo.bankName}\nبه نام: ${giftInfo.accountHolder}\nشماره کارت: ${giftInfo.cardNumber}\nشماره شبا: ${giftInfo.shabaNumber}`;
    copyToClipboard(fullText, 'all');
  };

  return (
    <section
      id="gift-section"
      className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto z-10 overflow-visible"
    >
      {/* Header & Badges */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-gold-deep" />
            یادبود و شادباش
            <Gift className="w-3.5 h-3.5 text-gold-deep" />
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <div className="py-2 overflow-visible">
          <h2 className="font-shekasteh text-3xl xs:text-4xl sm:text-5xl text-mahogany font-bold mb-2 text-gold-gradient leading-[1.8] sm:leading-[2.0] overflow-visible">
            {giftInfo.title}
          </h2>
        </div>

        {/* Formal & Respectful Note Card */}
        <div className="luxury-glass rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gold/30 shadow-luxury text-center relative overflow-hidden mt-3">
          <div className="flex items-center justify-center gap-2 text-gold-deep mb-2.5">
            <Heart className="w-4 h-4 fill-rose-gold text-rose-gold" />
            <span className="font-script text-lg sm:text-xl text-rose-deep">
              With Love & Gratitude
            </span>
            <Heart className="w-4 h-4 fill-rose-gold text-rose-gold" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-mahogany/90 leading-[2.1] font-light max-w-xl mx-auto">
            {giftInfo.formalNote}
          </p>
        </div>
      </div>

      {/* Minimalist Editorial Bank Card Component */}
      <div className="max-w-lg mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-br from-gold/40 via-champagne-200/50 to-rose-gold/40 shadow-luxury transition-all duration-300 hover:shadow-gold-glow">
          <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-[#FAF8F3] via-white to-[#F6F2EA] p-6 sm:p-8 border border-white/80 relative overflow-hidden">
            {/* Ambient Watermark Texture */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-gold/10 to-transparent rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-rose-gold/10 to-transparent rounded-full blur-xl pointer-events-none" />

            {/* Top Row: Chip & Bank Name */}
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-gold/15">
              <div className="flex items-center gap-3">
                {/* Minimalist Metallic Chip */}
                <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] p-1 flex flex-col justify-between shadow-sm border border-gold/40">
                  <div className="w-full h-0.5 bg-mahogany/30" />
                  <div className="w-full h-0.5 bg-mahogany/30" />
                  <div className="w-full h-0.5 bg-mahogany/30" />
                </div>
                <div>
                  <span className="font-sans font-bold text-sm text-mahogany block leading-tight">
                    {giftInfo.bankName}
                  </span>
                  <span className="text-[10px] text-warm-gray font-light">Saman Bank</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/25">
                <Sparkles className="w-3.5 h-3.5 text-gold-deep" />
                <span className="text-xs font-medium text-mahogany">هدیه عروسی</span>
              </div>
            </div>

            {/* Account Owner Name */}
            <div className="mb-6">
              <span className="text-[11px] text-warm-gray font-light block mb-1">به نام:</span>
              <p className="font-shekasteh text-2xl sm:text-3xl text-mahogany font-bold leading-normal text-gold-gradient">
                {giftInfo.accountHolder}
              </p>
            </div>

            {/* 1. Card Number Box with 1-Tap Copy */}
            <div className="bg-white/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-gold/25 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-warm-gray flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-gold-deep" />
                  شماره کارت بانکی (شتاب)
                </span>
                <span className="text-[10px] text-rose-deep font-mono">16 DIGITS</span>
              </div>

              <div className="flex items-center justify-between gap-2 mt-1">
                <div
                  dir="ltr"
                  className="font-mono text-base sm:text-lg md:text-xl font-bold text-mahogany tracking-wider select-all"
                >
                  {giftInfo.cardNumber.replace(/(\d{4})/g, '$1 ').trim()}
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(giftInfo.cardNumber, 'card')}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer shrink-0 ${
                    copiedField === 'card'
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-gold/15 hover:bg-gold/25 text-mahogany border-gold/30'
                  }`}
                  title="کپی شماره کارت"
                >
                  {copiedField === 'card' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gold-deep" />
                      <span>کپی شماره کارت</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Shaba (IBAN) Number Box with 1-Tap Copy */}
            <div className="bg-white/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-gold/25 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-warm-gray flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-gold-deep" />
                  شماره شبا (IBAN)
                </span>
                <span className="text-[10px] text-rose-deep font-mono">IRAN IBAN</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
                <div
                  dir="ltr"
                  className="font-mono text-xs sm:text-sm md:text-base font-semibold text-mahogany tracking-wide select-all break-all"
                >
                  {giftInfo.shabaNumber}
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(giftInfo.shabaNumber, 'shaba')}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer shrink-0 ${
                    copiedField === 'shaba'
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                      : 'bg-gold/15 hover:bg-gold/25 text-mahogany border-gold/30'
                  }`}
                  title="کپی شماره شبا"
                >
                  {copiedField === 'shaba' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gold-deep" />
                      <span>کپی شماره شبا</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 1-Tap Copy All Information Button */}
            <button
              type="button"
              onClick={copyAllInfo}
              className="w-full min-h-[46px] py-2.5 px-4 rounded-xl luxury-glass border border-gold/40 text-xs sm:text-sm font-medium text-mahogany hover:bg-gold/20 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 cursor-pointer shadow-sm"
            >
              {copiedField === 'all' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">
                    تمامی اطلاعات حساب با موفقیت کپی شد
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gold-deep" />
                  <span>کپی یک‌جای کلیه مشخصات حساب</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
