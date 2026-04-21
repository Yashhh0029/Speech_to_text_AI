import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

  const steps = [
    { num: '01', title: 'Capture', desc: 'Securely upload your audio file or record directly through our premium web interface.' },
    { num: '02', title: 'Process', desc: 'Our backend intelligently processes the audio using high-fidelity noise reduction and AI ingestion.' },
    { num: '03', title: 'Extract', desc: 'Advanced neural layers generate word-perfect JSON payloads instantaneously.' },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    
    // Draw line
    gsap.fromTo(lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    // Fade steps radially
    stepsRef.current.forEach((step, index) => {
      gsap.fromTo(step,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="container" style={{ padding: '6rem 2rem', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>The Flow of <span className="gradient-text">Intelligence</span></h2>
      </div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Animated timeline connecting line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }}></div>
        <div ref={lineRef} style={{ position: 'absolute', left: '50%', top: 0, width: '2px', background: 'linear-gradient(to bottom, var(--primary), var(--accent))', transform: 'translateX(-50%)' }}></div>

        {steps.map((step, i) => (
          <div 
            key={i} 
            ref={el => stepsRef.current[i] = el}
            style={{ 
              display: 'flex', 
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              alignItems: 'center',
              width: '100%',
              marginBottom: '4rem',
              position: 'relative'
            }}
          >
            {/* Timeline Dot */}
            <div style={{
               position: 'absolute', left: '50%', transform: 'translateX(-50%)',
               width: '24px', height: '24px', borderRadius: '50%',
               background: 'var(--bg-dark)', border: '4px solid var(--primary)',
               zIndex: 2, boxShadow: '0 0 15px rgba(99,102,241,0.5)'
            }}></div>

            <div className="glass" style={{ width: '45%', padding: '2.5rem', borderRadius: '16px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1rem', left: '1.5rem', fontSize: '4rem', fontWeight: '800', color: 'rgba(255,255,255,0.03)', zIndex: 0 }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
