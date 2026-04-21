import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Globe2, Sparkles, Layers, Cpu } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    { icon: <Zap size={24} className="text-primary" style={{color: 'var(--primary)'}} />, title: 'Real-time Processing', desc: 'Lightning fast inference powered by optimized neural architectures.' },
    { icon: <Shield size={24} className="text-primary" style={{color: 'var(--accent)'}} />, title: 'Privacy First', desc: 'Secure ephemeral audio processing that never stores your raw recordings.' },
    { icon: <Globe2 size={24} className="text-primary" style={{color: 'var(--secondary)'}} />, title: 'Multi-lingual Support', desc: 'Seamlessly transcribe across various languages and dialects.' },
    { icon: <Sparkles size={24} className="text-primary" style={{color: '#eab308'}} />, title: 'Contextual Accuracy', desc: 'Advanced NLP algorithms correct grammar based on context.' },
    { icon: <Layers size={24} className="text-primary" style={{color: '#06b6d4'}} />, title: 'Speaker Diarization', desc: 'Automatically differentiate between multiple speakers in a single track.' },
    { icon: <Cpu size={24} className="text-primary" style={{color: '#10b981'}} />, title: 'Edge Hardware Ready', desc: 'Lightweight models capable of running on minimal compute environments.' }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section id="features" ref={sectionRef} className="container" style={{ padding: '8rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Engineered for <span className="gradient-text">Excellence</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
          Every feature is meticulously designed to accelerate your workflow and guarantee perfect transcriptions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {features.map((feat, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="glass" 
            style={{ 
              padding: '2rem', 
              borderRadius: '16px', 
              transition: 'transform 0.3s ease, background 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
          >
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '12px', 
              background: 'rgba(255,255,255,0.05)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
              border: '1px solid var(--border-glass)'
            }}>
              {feat.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>{feat.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
