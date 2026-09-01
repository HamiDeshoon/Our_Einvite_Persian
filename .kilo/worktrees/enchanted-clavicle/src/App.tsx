import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiagonalCarousel from './components/DiagonalCarousel';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import TheWedding from './sections/TheWedding';
import Gallery from './sections/Gallery';
import RSVP from './sections/RSVP';
import Footer from './sections/Footer';
import VideoUpload from './components/VideoUpload';
import CountdownTimer from './components/CountdownTimer';
import LocationSection from './components/LocationSection';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <DiagonalCarousel />
      <Navigation />
      <main className="relative" style={{ zIndex: 10 }}>
        <Hero />
        <VideoUpload />
        <CountdownTimer targetDate="2026-08-13T18:00:00" />
        <OurStory />
        <TheWedding />
        <LocationSection />
        <Gallery />
        <RSVP />
        <Footer />
      </main>
    </>
  );
}
