import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitation.config';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const trackSrc = invitationConfig.media.audioTrack;
  const trackTitle = invitationConfig.media.audioTitle || 'نوای دلنشین پیانو (La Maritza)';

  const buildAudio = () => {
    if (!trackSrc) return null;
    if (audioRef.current) return audioRef.current;
    
    const audio = new Audio(trackSrc);
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;
    return audio;
  };

  const startPlaying = () => {
    const audio = buildAudio();
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setShowAutoPlayPrompt(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setShowAutoPlayPrompt(true);
      });
  };

  const pausePlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pausePlaying();
    } else {
      startPlaying();
    }
  };

  useEffect(() => {
    startPlaying();

    const handleFirstInteraction = () => {
      if (!audioRef.current || audioRef.current.paused) {
        startPlaying();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <>
      {/* Floating Audio Controller in bottom-left */}
      <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2">
        <div className="flex items-center gap-2 bg-ivory/90 backdrop-blur-xl border border-gold/30 shadow-luxury rounded-full p-1.5 pr-3.5 pl-2">
          <button
            type="button"
            onClick={toggleMusic}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? 'bg-gradient-to-tr from-gold to-rose-gold text-white shadow-gold-glow animate-pulse-gentle'
                : 'bg-champagne text-warm-gray hover:text-mahogany'
            }`}
            title={isPlaying ? 'توقف موسیقی' : 'پخش موسیقی'}
          >
            {isPlaying ? (
              <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          <div className="flex flex-col text-right pr-1">
            <span className="text-[11px] font-semibold text-mahogany leading-tight flex items-center gap-1">
              <span>{trackTitle}</span>
              <Sparkles className="w-3 h-3 text-gold" />
            </span>
            <span className="text-[10px] text-warm-gray">
              {isPlaying ? 'در حال پخش' : 'لمس کنید برای پخش'}
            </span>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-0.5 px-1.5">
              <span className="w-1 h-3 bg-rose-gold rounded-full animate-pulse" />
              <span className="w-1 h-4.5 bg-gold rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-rose-gold rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>

      {/* AutoPlay Prompt Banner if browser blocked sound */}
      {showAutoPlayPrompt && !isPlaying && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 luxury-glass rounded-full px-5 py-2.5 shadow-2xl border border-gold/40 flex items-center gap-3 animate-bounce">
          <Volume2 className="w-4 h-4 text-rose-gold animate-pulse" />
          <span className="text-xs text-mahogany font-medium">برای پخش نوای پیانوی مراسم لمس کنید</span>
          <button
            type="button"
            onClick={startPlaying}
            className="text-xs bg-rose-gold hover:bg-rose-deep text-white px-3 py-1 rounded-full font-semibold transition-colors"
          >
            پخش نوای جشن
          </button>
        </div>
      )}
    </>
  );
}
