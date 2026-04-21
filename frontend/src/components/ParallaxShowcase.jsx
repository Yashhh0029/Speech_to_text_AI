import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ParallaxShowcase = () => {
  const containerRef = useRef(null);
  const backRef = useRef(null);
  const midRef = useRef(null);
  const frontRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    tl.to(backRef.current, { y: '20%' }, 0)
      .to(midRef.current, { y: '-10%' }, 0)
      .to(frontRef.current, { y: '-40%' }, 0);
  }, []);

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      height: '60vh', 
      overflow: 'hidden', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginTop: '4rem'
    }}>
      {/* Background layer slowly moves down */}
      <div ref={backRef} style={{
        position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
        zIndex: 1
      }}></div>

      {/* Mid layer styling abstract text */}
      <div ref={midRef} style={{
        position: 'absolute', width: '120%', opacity: 0.1, zIndex: 2, pointerEvents: 'none',
        display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', transform: 'rotate(-5deg)'
      }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} style={{ fontSize: '2rem', fontWeight: 800, whiteSpace: 'nowrap' }}>[ SPEECH-TO-TEXT V1.0 ]</span>
        ))}
      </div>

      {/* Foreground Content moving up fast */}
      <div ref={frontRef} className="glass" style={{
        position: 'relative', zIndex: 3, padding: '4rem', borderRadius: '24px', 
        textAlign: 'center', maxWidth: '800px', margin: '0 2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>
          Hear the <span style={{ color: 'var(--accent)' }}>Difference</span>.
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
          Experience audio processing pushed to the limits. Smooth, precise, and breathtakingly fast.
        </p>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
