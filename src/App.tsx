import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import CountdownTimer from './components/CountdownTimer';
import OurStory from './sections/OurStory';
import TheWedding from './sections/TheWedding';
import Navigation from './sections/Navigation';
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';
import AudioPlayer from './components/AudioPlayer';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-rose-gold/20 selection:text-mahogany">
      {/* Ambient Floating Music Player */}
      <AudioPlayer />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <CountdownTimer />
        <OurStory />
        <TheWedding />
        <Navigation />
        <RSVP />
        <Footer />
      </main>
    </div>
  );
}
