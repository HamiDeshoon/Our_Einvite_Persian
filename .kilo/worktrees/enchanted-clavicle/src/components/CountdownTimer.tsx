import { useEffect, useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Countdown timer component.
 * targetDate: ISO date string for the ceremony start.
 */
export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  useScrollAnimation(containerRef);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const update = () => {
      const now = Date.now();
      const diff = target - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Removed unused format function after adopting graphical countdown layout.

  // Compute individual time units
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <section
      ref={containerRef}
      className="my-8 text-center fade-in"
      style={{ color: 'var(--color-espresso)' }}
    >
      <h2 className="font-display text-2xl md:text-3xl mb-2">Countdown to the ceremony</h2>
      <div className="flex justify-center gap-2 mt-4">
        <div className="countdown-box">
          <div className="font-display text-2xl">{days}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-box">
          <div className="font-display text-2xl">{hours}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-box">
          <div className="font-display text-2xl">{minutes}</div>
          <div className="countdown-label">Min</div>
        </div>
        <div className="countdown-box">
          <div className="font-display text-2xl">{seconds}</div>
          <div className="countdown-label">Sec</div>
        </div>
      </div>
    </section>
  );
}
