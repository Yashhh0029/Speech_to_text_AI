import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ParallaxShowcase from './components/ParallaxShowcase';
import ApplicationArea from './components/ApplicationArea';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-wrapper">
      {/* Background Blobs for styling */}
      <div className="blob" style={{ top: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(99,102,241,0.15)' }}></div>
      <div className="blob" style={{ top: '40%', right: '5%', width: '300px', height: '300px', background: 'rgba(236,72,153,0.12)' }}></div>
      <div className="blob" style={{ top: '80%', left: '20%', width: '500px', height: '500px', background: 'rgba(139,92,246,0.1)' }}></div>

      <Hero />
      <Features />
      <HowItWorks />
      <ParallaxShowcase />
      <ApplicationArea />
      <Footer />
    </div>
  );
}

export default App;
