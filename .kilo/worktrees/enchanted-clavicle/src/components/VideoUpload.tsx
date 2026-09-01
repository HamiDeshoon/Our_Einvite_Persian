import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * Component allowing the user to upload a short video and preview it.
 * The video is displayed prominently on the homepage. For browsers that
 * do not support the <video> tag, a fallback message is shown.
 */
export default function VideoUpload() {
  const [videoURL, setVideoURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Apply a subtle scroll‑triggered fade‑in when the component enters view
  useScrollAnimation(containerRef, { y: 30, duration: 0.8 });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setVideoURL(url);
      } else if (file.type === 'text/plain') {
        // Treat plain text file as a YouTube URL
        const reader = new FileReader();
        reader.onload = () => {
          const text = (reader.result as string).trim();
          setVideoURL(text);
        };
        reader.readAsText(file);
      }
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  // Helper to detect YouTube URLs
  const isYouTube = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(url);

  return (
    <section ref={containerRef} className="my-12 max-w-4xl mx-auto fade-in" id="video-invite">
      <h2 className="font-serif text-2xl md:text-3xl text-center mb-6 text-[var(--color-espresso)]">
        Your Invitation Video
      </h2>
      {videoURL ? (
        isYouTube(videoURL) ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={videoURL.replace('watch?v=', 'embed/')}
              title="Invitation Video"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <video
            src={videoURL}
            controls
            autoPlay
            loop
            muted
            className="w-full h-auto rounded-lg shadow-lg"
          >
            Your browser does not support the video element.
          </video>
        )
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={triggerInput}
            className="px-6 py-3 bg-[var(--color-gold)] text-white rounded-md hover:bg-[var(--color-blush)] transition"
          >
            Upload Video / Provide YouTube Link
          </button>
          <input
            type="file"
            accept="video/*,text/plain"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </section>
  );
}
