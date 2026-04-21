import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mic, ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    );
  }, []);

  const scrollToApp = () => {
    document.getElementById('application-area').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '4rem' }}>
      <div style={{ maxWidth: '800px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'full', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '2rem', color: 'var(--primary)', fontWeight: '500', fontSize: '0.875rem' }}>
          <span style={{ position: 'relative', display: 'flex', height: '8px', width: '8px' }}>
            <span style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', backgroundColor: 'var(--primary)', opacity: 0.75 }}></span>
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: '8px', width: '8px', backgroundColor: 'var(--primary)' }}></span>
          </span>
          Next-Gen AI Transcription Is Here
        </div>
        
        <h1 ref={titleRef} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Transform Speech Into <span className="gradient-text-accent">Actionable Text</span>
        </h1>
        
        <p ref={subtitleRef} style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Experience the world's most advanced, ultra-smooth AI transcription platform. Built with cutting-edge neural networks to deliver pixel-perfect accuracy in real-time.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={scrollToApp} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            <Mic size={20} /> Start Transcribing
          </button>
          <a href="#how-it-works" className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Learn More <ArrowRight size={20} />
          </a>
        </div>
      </div>
      
      {/* Background abstract elements specifically for hero */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
