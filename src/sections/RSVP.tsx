import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, User, Users, MessageSquare, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function RSVP() {
  const { rsvp, couple } = invitationConfig;

  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guestCount: 1,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#B76E79', '#F5E3B3', '#9D4A55'],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);

    // Simulate saving response / local persistence
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (formData.attending === 'yes') {
        triggerConfetti();
      }
    }, 600);
  };

  return (
    <section id="rsvp-section" className="relative py-16 sm:py-24 px-4 max-w-3xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
            اعلام حضور در جشن
            <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <h2 className="font-nastaliq text-3xl sm:text-4xl md:text-5xl text-mahogany font-bold mb-2 leading-relaxed">
          حضور گرم شما روشنی‌بخش بزم ماست
        </h2>
        <p className="text-warm-gray text-xs sm:text-sm font-light">
          {rsvp.deadlineText}
        </p>
      </div>

      {/* Form Container */}
      <div className="rounded-3xl p-1 bg-gradient-to-b from-gold/40 via-champagne-200/40 to-rose-gold/30 shadow-luxury">
        <div className="rounded-[calc(1.5rem-4px)] bg-ivory/95 backdrop-blur-md p-6 sm:p-10 border border-white/80">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-nastaliq text-2xl sm:text-3xl text-mahogany font-bold mb-2 pt-1 text-gold-gradient">
                پاسخ شما با مهر ثبت شد
              </h3>
              <p className="text-xs sm:text-sm text-warm-gray max-w-md mx-auto leading-relaxed mb-6 font-light">
                {formData.attending === 'yes'
                  ? `بسیار خرسندیم که در این شب پر از شادمانی در کنار ${couple.groom} و ${couple.bride} خواهید بود.`
                  : 'جای شما در این جشن پر از شادمانی خالی خواهد بود و از پیام پرمهرتان سپاسگزاریم.'}
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-rose-gold hover:text-rose-deep font-semibold underline underline-offset-4"
              >
                ویرایش یا ارسال پاسخ دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  placeholder="مثال: علی احمدی و خانواده"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-gold/30 text-mahogany text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all placeholder:text-warm-gray/50"
                />
              </div>

              {/* Attendance Status */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-mahogany mb-2 block">
                  وضعیت حضور شما در مراسم
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      formData.attending === 'yes'
                        ? 'bg-gradient-to-r from-gold/20 to-rose-gold/20 border-rose-gold text-rose-deep shadow-sm font-semibold'
                        : 'bg-white/60 border-gold/20 text-warm-gray hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${formData.attending === 'yes' ? 'fill-rose-gold text-rose-gold' : ''}`} />
                    <span>با کمال میل حضور خواهم داشت</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      formData.attending === 'no'
                        ? 'bg-mahogany/10 border-mahogany/40 text-mahogany shadow-sm font-semibold'
                        : 'bg-white/60 border-gold/20 text-warm-gray hover:bg-white'
                    }`}
                  >
                    <span>متأسفانه امکان حضور ندارم</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {formData.attending === 'yes' && (
                <div>
                  <label className="text-xs sm:text-sm font-medium text-mahogany mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold-deep" />
                      تعداد همراهان (شامل خودتان)
                    </span>
                    <span className="text-xs text-rose-gold font-bold">{formData.guestCount} نفر</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guestCount: num })}
                        className={`flex-1 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                          formData.guestCount === num
                            ? 'bg-gold text-mahogany border-gold shadow-gold-glow'
                            : 'bg-white/80 border-gold/20 text-warm-gray hover:border-gold/50'
                        }`}
                      >
                        {num}
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
                  className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-gold/30 text-mahogany text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all placeholder:text-warm-gray/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold via-rose-gold to-gold text-white font-bold text-sm sm:text-base shadow-luxury hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>ثبت نهایی و ارسال پاسخ</span>
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
