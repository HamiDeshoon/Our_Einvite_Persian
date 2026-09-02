import { useEffect, useState, useRef } from 'react';
import { Calendar, ChevronDown, Download, ExternalLink, Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';
import {
  downloadIcsFile,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
} from '../lib/calendar';

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function toPersianDigits(n: number | string): string {
  return String(n).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date(invitationConfig.event.targetIsoDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const eventConfig = {
    title: `جشن پیوند ${invitationConfig.couple.groom} و ${invitationConfig.couple.bride}`,
    description: `${invitationConfig.couple.welcomeText}\nمحل برگزاری: ${invitationConfig.event.venueName} (${invitationConfig.event.venueAddress})`,
    location: `${invitationConfig.event.venueName}, ${invitationConfig.event.venueAddress}`,
    startTime: new Date(invitationConfig.event.targetIsoDate),
    endTime: new Date('2026-09-11T23:59:00+03:30'),
  };

  const timerUnits = [
    { label: 'روز', value: timeLeft.days },
    { label: 'ساعت', value: timeLeft.hours },
    { label: 'دقیقه', value: timeLeft.minutes },
    { label: 'ثانیه', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-12 sm:py-16 px-4 max-w-4xl mx-auto text-center z-10">
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="text-xs uppercase tracking-[0.2em] font-serif text-rose-deep flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
          شمارش معکوس تا آغاز پیوند
          <Heart className="w-3.5 h-3.5 fill-rose-gold text-rose-gold" />
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
      </div>

      <h3 className="font-shekasteh text-2xl sm:text-3xl text-mahogany font-bold mb-1.5 pt-1">
        لحظه‌شماری برای هم‌نفسی با شما عزیزان
      </h3>
      <p className="text-warm-gray text-xs sm:text-sm font-light mb-7 max-w-md mx-auto leading-relaxed">
        {invitationConfig.event.weddingDayText} • {invitationConfig.event.timeText}
      </p>

      {/* 4-Box Luxury Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-5 max-w-xl mx-auto mb-7">
        {timerUnits.map((unit) => (
          <div
            key={unit.label}
            className="group relative rounded-xl sm:rounded-2xl p-0.5 bg-gradient-to-b from-gold/40 via-champagne-200/50 to-rose-gold/30 shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow"
          >
            <div className="rounded-[calc(0.75rem-2px)] sm:rounded-[calc(1rem-2px)] bg-ivory/95 backdrop-blur-md p-2 xs:p-3 sm:p-5 border border-white/90 text-center">
              <div className="font-katibeh text-2xl xs:text-3xl sm:text-5xl font-bold text-mahogany text-gold-gradient tracking-tight">
                {toPersianDigits(unit.value < 10 ? `0${unit.value}` : unit.value)}
              </div>
              <div className="text-[10px] sm:text-xs text-warm-gray font-medium mt-0.5">
                {unit.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add to Calendar Dropdown */}
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="inline-flex items-center gap-2 min-h-[46px] px-5 py-2.5 rounded-full luxury-glass border border-gold/40 text-xs sm:text-sm font-medium text-mahogany hover:bg-gold/10 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-gold-deep" />
          <span>یادآوری در تقویم</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${calendarOpen ? 'rotate-180' : ''}`} />
        </button>

        {calendarOpen && (
          <div className="absolute top-full right-1/2 translate-x-1/2 mt-2 w-60 luxury-glass rounded-2xl shadow-2xl border border-gold/30 p-2 z-50 animate-fadeIn text-right">
            <a
              href={generateGoogleCalendarUrl(eventConfig)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between min-h-[44px] px-3.5 py-2.5 text-xs text-mahogany rounded-xl hover:bg-champagne-100/80 transition-colors"
            >
              <span>تقویم گوگل (Google Calendar)</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-deep" />
            </a>
            <a
              href={generateOutlookCalendarUrl(eventConfig)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between min-h-[44px] px-3.5 py-2.5 text-xs text-mahogany rounded-xl hover:bg-champagne-100/80 transition-colors"
            >
              <span>تقویم مایکروسافت (Outlook)</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-deep" />
            </a>
            <button
              type="button"
              onClick={() => downloadIcsFile(eventConfig)}
              className="w-full flex items-center justify-between min-h-[44px] px-3.5 py-2.5 text-xs text-mahogany rounded-xl hover:bg-champagne-100/80 transition-colors cursor-pointer"
            >
              <span>دانلود فایل تقویم (Apple / iCal)</span>
              <Download className="w-3.5 h-3.5 text-rose-gold" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
