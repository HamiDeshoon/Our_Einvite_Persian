import { useState } from 'react';
import { MapPin, Navigation as NavIcon, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function Navigation() {
  const { event, navigation } = invitationConfig;
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName} - ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const navApps = [
    {
      name: 'مسیریاب نشان',
      nameEn: 'Neshan',
      url: navigation.neshanDirectUrl,
      bg: 'from-[#00A859]/10 to-[#00A859]/20 hover:border-[#00A859]/50 text-[#007D42]',
      icon: '🚗',
    },
    {
      name: 'مسیریاب بلد',
      nameEn: 'Balad',
      url: navigation.baladDirectUrl,
      bg: 'from-[#3B82F6]/10 to-[#3B82F6]/20 hover:border-[#3B82F6]/50 text-[#1D4ED8]',
      icon: '🗺️',
    },
    {
      name: 'گوگل مپ',
      nameEn: 'Google Maps',
      url: navigation.googleMapsDirectUrl,
      bg: 'from-[#EA4335]/10 to-[#EA4335]/20 hover:border-[#EA4335]/50 text-[#B91C1C]',
      icon: '📍',
    },
    {
      name: 'اپل مپ',
      nameEn: 'Apple Maps',
      url: navigation.appleMapsDirectUrl,
      bg: 'from-[#71717A]/10 to-[#71717A]/20 hover:border-[#71717A]/50 text-[#3F3F46]',
      icon: '🧭',
    },
  ];

  return (
    <section id="location-section" className="relative py-16 sm:py-24 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-gold" />
            محل برگزاری و مسیریابی
            <MapPin className="w-3.5 h-3.5 text-rose-gold" />
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <h2 className="font-nastaliq text-3xl sm:text-4xl md:text-5xl text-mahogany font-bold mb-3 leading-relaxed">
          {event.venueName}
        </h2>
        <p className="text-warm-gray text-xs sm:text-sm font-light max-w-lg mx-auto">
          مشتاق دیدار روی گل تک‌تک شما سروران و عزیزان گرامی هستیم
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Venue Information Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="rounded-3xl p-1 bg-gradient-to-b from-gold/40 via-champagne-200/40 to-rose-gold/30 shadow-luxury h-full flex flex-col">
            <div className="rounded-[calc(1.5rem-4px)] bg-ivory/95 backdrop-blur-md p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-champagne-100 flex items-center justify-center border border-gold/30 mb-4 shadow-sm">
                  <Sparkles className="w-6 h-6 text-gold-deep" />
                </div>

                <h3 className="font-nastaliq text-2xl text-mahogany font-bold mb-2 pt-1 text-gold-gradient">
                  {event.venueName}
                </h3>

                <div className="flex items-start gap-2.5 mb-6 text-warm-gray">
                  <MapPin className="w-4 h-4 text-rose-gold shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm leading-relaxed font-light">
                    {event.venueAddress}
                  </p>
                </div>
              </div>

              {/* Copy Address Button */}
              <div>
                <button
                  type="button"
                  onClick={copyAddress}
                  className="w-full py-3 px-4 rounded-2xl luxury-glass border border-gold/40 text-xs sm:text-sm font-medium text-mahogany hover:bg-gold/15 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm mb-6"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">آدرس با موفقیت کپی شد</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gold-deep" />
                      <span>کپی آدرس تالار برای ارسال</span>
                    </>
                  )}
                </button>

                {/* Quick 1-Tap App Navigation Buttons */}
                <div className="border-t border-gold/20 pt-4">
                  <span className="text-[11px] uppercase tracking-wider text-rose-deep font-serif block mb-3 text-center">
                    انتخاب اپلیکیشن مسیریابی
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {navApps.map((app) => (
                      <a
                        key={app.nameEn}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border border-gold/25 bg-gradient-to-r ${app.bg} transition-all duration-300 flex items-center justify-between group`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{app.icon}</span>
                          <span className="text-xs font-medium">{app.name}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl p-1 bg-gradient-to-b from-gold/40 via-champagne-200/40 to-rose-gold/30 shadow-luxury h-full min-h-[360px] sm:min-h-[440px]">
            <div className="rounded-[calc(1.5rem-4px)] overflow-hidden w-full h-full relative border border-white/80">
              <iframe
                title={`نقشه ${event.venueName}`}
                src={navigation.googleMapsEmbedUrl}
                className="w-full h-full min-h-[360px] sm:min-h-[440px] border-0 filter contrast-[1.02]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 right-3 luxury-glass rounded-full px-3 py-1.5 border border-gold/40 text-xs text-mahogany font-medium flex items-center gap-1.5 shadow-md">
                <NavIcon className="w-3.5 h-3.5 text-rose-gold" />
                <span>موقعیت تالار روی نقشه</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
