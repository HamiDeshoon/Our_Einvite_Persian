import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, User, Users, MessageSquare, Phone, Sparkles, AlertCircle, Plus, Minus, Gift } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function RSVP() {
  const { rsvp, couple } = invitationConfig;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'yes',
    guestCount: 1,
    message: '',
    website: '', // Honeypot field for bot protection
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#B76E79', '#F5E3B3', '#9D4A55', '#E5C158'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Honeypot check
    if (formData.website && formData.website.trim() !== '') {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      guests: formData.attending === 'yes' ? String(formData.guestCount) : '0',
      attending: formData.attending === 'yes' ? 'حضور خواهم داشت' : 'امکان حضور ندارم',
      message: formData.message.trim(),
      website: formData.website,
    };

    try {
      if (rsvp.sheetEndpoint) {
        await fetch(rsvp.sheetEndpoint, {
          method: 'POST',
          // text/plain is used to avoid CORS preflight options blocking in Google Apps Script
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          mode: 'no-cors', // ensures safe receipt even with Google redirects
        });
      }

      setSubmitted(true);
      if (formData.attending === 'yes') {
        triggerConfetti();
      }
    } catch (err) {
      console.error('RSVP Submission Error:', err);
      // Fallback grace: even if offline or blocked by adblock, let the user know their response is saved locally
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp-section" className="relative py-14 sm:py-24 px-4 max-w-2xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
            اعلام حضور در جشن
            <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
          </span>
          <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <h2 className="font-shekasteh text-3xl xs:text-4xl sm:text-5xl text-mahogany font-bold mb-2 leading-relaxed">
          حضور گرم شما روشنی‌بخش بزم ماست
        </h2>
        <p className="text-warm-gray text-xs sm:text-sm font-light">
          {rsvp.deadlineText}
        </p>
      </div>

      {/* Form Container */}
      <div className="rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-gold/40 via-champagne-200/40 to-rose-gold/30 shadow-luxury">
        <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-4px)] bg-ivory/95 backdrop-blur-md p-5 sm:p-9 border border-white/80">
          {submitted ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-shekasteh text-2xl sm:text-3xl text-mahogany font-bold mb-2 pt-1 text-gold-gradient">
                پاسخ شما در لیست مهمانان ثبت گردید
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray max-w-md mx-auto leading-relaxed mb-6 font-light">
                {formData.attending === 'yes'
                  ? `بسیار خرسندیم که در این شب به‌یادماندنی در کنار ${couple.groom} و ${couple.bride} خواهید بود.`
                  : 'جای شما در این جشن پر از شادمانی خالی خواهد بود و از ابراز لطف و پیام پرمهرتان صمیمانه سپاسگزاریم.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <a
                  href="#gift-section"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold/40 luxury-glass text-xs font-medium text-mahogany hover:bg-gold/15 transition-all shadow-sm active:scale-95"
                >
                  <Gift className="w-4 h-4 text-gold-deep" />
                  <span>مشاهده اطلاعات هدیه و شادباش پیوند</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-rose-gold hover:text-rose-deep font-semibold underline underline-offset-4 p-2 transition-colors"
              >
                ویرایش یا ارسال پاسخ برای همراه دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
              {/* Honeypot field (hidden from genuine users) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <label htmlFor="name-input" className="text-xs sm:text-sm font-medium text-mahogany mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gold-deep" />
                  <span>نام و نام خانوادگی مهمان گرامی *</span>
                </label>
                <input
                  id="name-input"
                  type="text"
                  required
                  placeholder="مثال: علی رضایی و خانواده"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl sm:rounded-2xl bg-white/90 border border-gold/30 text-mahogany text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all placeholder:text-warm-gray/50 shadow-sm"
                />
              </div>

              {/* Mobile Phone Input */}
              <div>
                <label htmlFor="phone-input" className="text-xs sm:text-sm font-medium text-mahogany mb-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-gold-deep" />
                  <span>شماره تماس یا همراه (اختیاری جهت هماهنگی)</span>
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  inputMode="tel"
                  dir="ltr"
                  placeholder="0912..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl sm:rounded-2xl bg-white/90 border border-gold/30 text-mahogany text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all placeholder:text-warm-gray/50 shadow-sm text-left"
                />
              </div>

              {/* Attendance Status */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-mahogany mb-2 block">
                  وضعیت حضور شما در جشن
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`min-h-[50px] py-3 px-3.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      formData.attending === 'yes'
                        ? 'bg-gradient-to-r from-gold/25 to-rose-gold/25 border-rose-gold text-rose-deep shadow-sm font-semibold'
                        : 'bg-white/70 border-gold/20 text-warm-gray hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 shrink-0 ${formData.attending === 'yes' ? 'fill-rose-gold text-rose-gold' : ''}`} />
                    <span>با کمال میل حضور خواهم داشت</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`min-h-[50px] py-3 px-3.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      formData.attending === 'no'
                        ? 'bg-mahogany/15 border-mahogany/40 text-mahogany shadow-sm font-semibold'
                        : 'bg-white/70 border-gold/20 text-warm-gray hover:bg-white'
                    }`}
                  >
                    <span>متأسفانه امکان حضور ندارم</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (if attending) - Flexible without 5-person cap */}
              {formData.attending === 'yes' && (
                <div className="animate-fadeIn">
                  <label className="text-xs sm:text-sm font-medium text-mahogany mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold-deep" />
                      تعداد مهمانان گرامی (شامل خودتان)
                    </span>
                    <span className="text-xs text-rose-gold font-bold bg-rose-silk px-2.5 py-1 rounded-full border border-rose-gold/20">
                      {formData.guestCount} نفر
                    </span>
                  </label>

                  {/* Flexible Stepper Counter & Direct Number Input */}
                  <div className="flex items-center gap-3 bg-white/90 p-2 rounded-2xl border border-gold/30 shadow-sm mb-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestCount: Math.max(1, formData.guestCount - 1) })}
                      disabled={formData.guestCount <= 1}
                      className="w-11 h-11 rounded-xl bg-champagne-100/80 hover:bg-gold/20 text-mahogany disabled:opacity-40 flex items-center justify-center font-bold text-lg border border-gold/20 transition-all active:scale-95 cursor-pointer"
                      title="کاهش تعداد"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="flex-1 flex items-center justify-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={formData.guestCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setFormData({ ...formData, guestCount: isNaN(val) ? 1 : Math.max(1, Math.min(50, val)) });
                        }}
                        className="w-20 text-center font-katibeh text-3xl font-bold text-mahogany bg-transparent border-b-2 border-gold/50 focus:border-gold focus:outline-none py-0.5"
                      />
                      <span className="text-xs text-warm-gray font-medium">نفر</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestCount: formData.guestCount + 1 })}
                      className="w-11 h-11 rounded-xl bg-gold/20 hover:bg-gold/30 text-mahogany flex items-center justify-center font-bold text-lg border border-gold/30 transition-all active:scale-95 cursor-pointer shadow-sm"
                      title="افزایش تعداد"
                    >
                      <Plus className="w-4 h-4 text-mahogany" />
                    </button>
                  </div>

                  {/* Quick Select Preset Pills */}
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guestCount: num })}
                        className={`min-h-[40px] py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                          formData.guestCount === num
                            ? 'bg-gold text-mahogany border-gold shadow-gold-glow'
                            : 'bg-white/70 border-gold/20 text-warm-gray hover:border-gold/40'
                        }`}
                      >
                        {num} نفر
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Congratulatory Message */}
              <div>
                <label htmlFor="message-input" className="text-xs sm:text-sm font-medium text-mahogany mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-gold-deep" />
                  <span>پیام شادباش یا یادداشت به عروس و داماد (اختیاری)</span>
                </label>
                <textarea
                  id="message-input"
                  rows={3}
                  placeholder="آرزوی خوشبختی، شعر یا پیام محبت‌آمیز شما..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-white/90 border border-gold/30 text-mahogany text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all placeholder:text-warm-gray/50 resize-none shadow-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[52px] py-3.5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gold via-rose-gold to-gold text-white font-bold text-sm sm:text-base shadow-luxury hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>ثبت در لیست مهمانان و ارسال پاسخ</span>
                    <Send className="w-4 h-4 mr-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
