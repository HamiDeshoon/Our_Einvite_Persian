import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { asset } from '../lib/assets';
import { invitationConfig } from '../config/invitation.config';

export default function VideoUpload() {
  const containerRef = useRef<HTMLElement | null>(null);
  useScrollAnimation(containerRef);

  return (
    <section
      ref={containerRef}
      className="my-16 max-w-4xl mx-auto px-4 fade-in"
      id="video-invite"
      style={{ zIndex: 10 }}
    >
      <div className="glass-card p-8 md:p-12 text-center rounded-3xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-4 font-bold text-mahogany">
          ویدیو دعوتنامه اختصاصی
        </h2>
        <p className="font-sans text-[16px] text-warm-gray mb-6 max-w-[440px] mx-auto">
          پیام ویدیویی خاطره‌انگیز ما برای شما همراهان و عزیزان همیشگی
        </p>
        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-black/5">
          <video
            src={asset(invitationConfig.videos.featuredVideo || invitationConfig.videos.heroBg)}
            controls
            loop
            muted
            playsInline
            preload="metadata"
            poster={asset(invitationConfig.videos.heroPoster)}
            className="w-full h-full object-cover"
          >
            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
          </video>
        </div>
      </div>
    </section>
  );
}