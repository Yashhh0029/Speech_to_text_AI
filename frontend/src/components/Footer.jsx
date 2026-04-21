import React from 'react';
import { Code2, AtSign, Link2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
        padding: '4rem 2rem 2rem', 
        borderTop: '1px solid var(--border-glass)',
        marginTop: '6rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '1.5rem', fontFamily: 'Outfit' }}>
          Transc<span className="gradient-text-accent">AI</span>
        </h2>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          Building the future of auditory intelligence. Delivering seamless, sub-second latency speech-to-text globally.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <Code2 size={20} />
            </a>
            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#1DA1F2'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <AtSign size={20} />
            </a>
            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#0e76a8'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <Link2 size={20} />
            </a>
        </div>

        <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
            <span>&copy; {new Date().getFullYear()} TranscAI Inc. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
