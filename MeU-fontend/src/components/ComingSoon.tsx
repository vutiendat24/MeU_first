import React, { useState } from 'react';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleNavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const validateEmail = (val: string) => {
    const t = val.trim();
    if (!t) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return 'Please enter a valid email (e.g. name@gmail.com).';
    if (val.length > 50) return 'Email must not exceed 50 characters.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsClaimed(true);
  };

  return (
    <main
      className="cs-root"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        /* Warm ivory-cream base */
        background: 'linear-gradient(140deg, #fdf6ee 0%, #fef8f1 45%, #fff3e6 100%)',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ══════════ GLOBAL STYLES ══════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        /* ── keyframes ── */
        @keyframes floatBob {
          0%,100% { transform: translateY(0)   scale(1);   }
          50%      { transform: translateY(-26px) scale(1.08); }
        }
        @keyframes spinSlow  { to { transform: rotate(360deg); } }
        @keyframes spinCCW   { to { transform: rotate(-360deg); } }
        @keyframes rippleOut {
          0%   { transform: scale(0.7); opacity: 0.6; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 24px 4px rgba(212,160,90,0.28), 0 0 60px 10px rgba(212,160,90,0.10); }
          50%      { box-shadow: 0 0 44px 10px rgba(212,160,90,0.50), 0 0 90px 20px rgba(212,160,90,0.18); }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.12; transform: scale(0.9); }
          50%      { opacity: 0.85; transform: scale(1.5); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradBar {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes orbDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(18px,-22px) scale(1.06); }
          66%      { transform: translate(-14px,16px) scale(0.96); }
        }
        @keyframes shimBtn {
          0%   { left: -110%; }
          60%  { left: 110%; }
          100% { left: 110%; }
        }
        @keyframes cardFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes beanWiggle {
          0%,100% { transform: rotate(var(--r)) scale(1); }
          50%      { transform: rotate(calc(var(--r) + 15deg)) scale(1.08); }
        }

        /* ── utility classes ── */
        .animate-float-bob { animation: floatBob var(--dur,8s) ease-in-out infinite; }
        .animate-spin-slow  { animation: spinSlow 22s linear infinite; }
        .animate-spin-ccw   { animation: spinCCW 16s linear infinite; }
        .animate-ripple     { animation: rippleOut 2.4s ease-out infinite; }
        .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
        .animate-twinkle    { animation: twinkle var(--dur,3s) ease-in-out infinite; }
        .animate-fade-up    { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
        .animate-orb-drift  { animation: orbDrift var(--dur,14s) ease-in-out infinite; }
        .animate-card-float { animation: cardFloat var(--dur,5s) ease-in-out infinite; }

        /* ── glass card ── */
        .glass {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1.5px solid rgba(212,160,90,0.22);
        }
        .glass-strong {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1.5px solid rgba(212,160,90,0.3);
        }

        /* ── shine button ── */
        .shine { position: relative; overflow: hidden; }
        .shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%);
          left: -110%;
          animation: shimBtn 3.5s ease infinite;
        }

        /* ── gradient text ── */
        .text-gold {
          background: linear-gradient(135deg, #b05e10 0%, #d4925a 40%, #e8b97a 70%, #c8851a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .text-dark-coffee {
          background: linear-gradient(135deg, #1a0b02 0%, #4a2210 60%, #7a4a28 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── grad bar ── */
        .grad-bar {
          background: linear-gradient(90deg, #D4925A, #F0C070, #E8956A, #C87832, #F0C070, #D4925A);
          background-size: 300% 100%;
          animation: gradBar 4s ease infinite;
        }
      `}</style>

      {/* ══════════ COMING SOON MODAL ══════════ */}
      {showModal && (
        <div
          className="animate-fade-up"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(30,10,0,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: '24px',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #fff8f0, #fef3e4)',
              border: '1.5px solid rgba(212,160,90,0.35)',
              borderRadius: 28,
              padding: '48px 40px 36px',
              maxWidth: 440,
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 32px 80px rgba(120,60,10,0.28), 0 8px 24px rgba(120,60,10,0.12)',
              position: 'relative',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(212,148,60,0.12)',
                border: '1px solid rgba(212,148,60,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#8a5020', fontSize: 18, lineHeight: 1,
                transition: 'background .2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,148,60,0.25)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,148,60,0.12)')}
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Coffee emoji icon */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, #C8875A, #E0A860)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, margin: '0 auto 20px',
              boxShadow: '0 8px 28px rgba(180,100,30,0.38)',
              animation: 'floatBob 3s ease-in-out infinite',
            }}>☕</div>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 900, marginBottom: 12,
              background: 'linear-gradient(135deg, #7a3a10, #C8875A, #E0A060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>We're Coming Soon! 🚀</h2>

            {/* Animated gradient divider */}
            <div className="grad-bar" style={{ width: 60, height: 3, borderRadius: 4, margin: '0 auto 20px' }} />

            {/* Message */}
            <p style={{ color: '#5a3010', fontSize: 15, fontWeight: 500, lineHeight: 1.75, marginBottom: 12 }}>
              Our coffee shop is currently under preparation and will be opening soon.
            </p>
            <p style={{ color: '#8a5828', fontSize: 14, fontWeight: 500, lineHeight: 1.7, marginBottom: 28 }}>
              We appreciate your patience and warmly hope for your continued support.
              Great coffee is worth the wait! ✨
            </p>

            {/* CTA button */}
            <button
              className="shine"
              onClick={() => setShowModal(false)}
              style={{
                background: 'linear-gradient(135deg, #7a4820, #C8875A, #E0A860)',
                color: 'white', border: 'none', borderRadius: 50,
                padding: '13px 36px', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 6px 22px rgba(180,100,30,0.42), inset 0 1px 0 rgba(255,255,255,0.2)',
                transition: 'transform .2s',
                width: '100%',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
            >
              Got it, I'll be back! ☕
            </button>

            <p style={{ color: '#b07840', fontSize: 12, marginTop: 16, fontWeight: 500 }}>
              Leave your email below to be the first to know when we open.
            </p>
          </div>
        </div>
      )}

      {/* ══════════ BACKGROUND LAYER ══════════ */}

      {/* Floating ambient orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Large gold orb — top right */}
        <div className="animate-orb-drift" style={{
          position: 'absolute', top: -100, right: -80,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(212,160,90,0.32), rgba(240,180,80,0.08) 65%, transparent)',
          filter: 'blur(36px)',
          '--dur': '18s',
        } as React.CSSProperties} />

        {/* Amber orb — bottom right */}
        <div className="animate-orb-drift" style={{
          position: 'absolute', bottom: -80, right: '15%',
          width: 380, height: 380, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,140,60,0.24), transparent 70%)',
          filter: 'blur(44px)',
          '--dur': '22s', animationDelay: '-8s',
        } as React.CSSProperties} />

        {/* Rose-gold accent — mid right */}
        <div className="animate-orb-drift" style={{
          position: 'absolute', top: '28%', right: '5%',
          width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,175,120,0.28), transparent 70%)',
          filter: 'blur(32px)',
          '--dur': '12s', animationDelay: '-4s',
        } as React.CSSProperties} />

        {/* Soft lemon-gold orb — bottom center */}
        <div className="animate-orb-drift" style={{
          position: 'absolute', bottom: '8%', right: '38%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,195,100,0.18), transparent 70%)',
          filter: 'blur(40px)',
          '--dur': '16s', animationDelay: '-2s',
        } as React.CSSProperties} />

        {/* Top-left subtle warm orb */}
        <div className="animate-orb-drift" style={{
          position: 'absolute', top: '10%', left: '52%',
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,210,140,0.22), transparent 70%)',
          filter: 'blur(28px)',
          '--dur': '20s', animationDelay: '-11s',
        } as React.CSSProperties} />
      </div>

      {/* Grid texture — right side only */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', right: 0, top: 0, width: '54%', height: '100%', opacity: 0.055 }}>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#8C6030" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Diagonal rule lines */}
        {[
          { right: '9%',  top: '12%', h: 130, rot: 22 },
          { right: '22%', top: '55%', h: 90,  rot: -18 },
          { right: '14%', top: '70%', h: 60,  rot: 35 },
        ].map((l, i) => (
          <div key={i} style={{
            position: 'absolute', right: l.right, top: l.top,
            width: 2, height: l.h,
            background: 'linear-gradient(to bottom, transparent, rgba(212,160,90,0.5), transparent)',
            transform: `rotate(${l.rot}deg)`,
            borderRadius: 2,
          }} />
        ))}
      </div>

    

      {/* ══════════ LEFT TAN WAVE ══════════ */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <svg viewBox="0 0 1440 1024" style={{ width: '100%', height: '100%', objectFit: 'cover' }} preserveAspectRatio="none">
          {/* Main tan wave */}
          <path fill="#C8975C" d="M0,0 L0,1024 L850,1024 C1100,750 550,550 700,250 C800,50 600,0 550,0 Z" />
          {/* Lighter layer for depth */}
          <path fill="rgba(232,185,130,0.38)" d="M0,0 L0,1024 L580,1024 C830,770 390,570 510,275 C610,78 445,0 400,0 Z" />
          {/* Highlight edge */}
          <path fill="rgba(255,255,255,0.14)" d="M0,0 L0,1024 L180,1024 C290,900 140,690 190,400 C230,185 175,0 145,0 Z" />
          {/* Dark coffee accent at very bottom-left */}
          <path fill="rgba(90,45,10,0.12)" d="M0,700 L0,1024 L200,1024 C300,950 150,800 0,700 Z" />
        </svg>
      </div>

      {/* ══════════ MAIN CONTAINER ══════════ */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1440, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'clamp(24px, 4vw, 64px)' }}>

        {/* ─── NAVBAR ─── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 'clamp(48px, 7vw, 96px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'white' }}>
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: 1, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>MeU Coffee</span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {['Home','About','Shop'].map(l => (
              <a key={l} href="#" onClick={handleNavClick} style={{ color: '#7a4a20', fontWeight: 600, fontSize: 14, textDecoration: 'none', opacity: 0.85, transition: 'opacity .2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
              >{l}</a>
            ))}
            <button
              className="shine"
              onClick={handleNavClick}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'linear-gradient(135deg, #7a4a20, #C8875A, #D4A060)',
                color: 'white', border: 'none', borderRadius: 50,
                padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(180,100,30,0.42), inset 0 1px 0 rgba(255,255,255,0.2)',
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Order Now
            </button>
          </nav>
        </header>

        {/* ─── 2-COLUMN LAYOUT ─── */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'center' }}>

          {/* ══ LEFT COLUMN ══ */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* Coming Soon pill badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(27, 143, 244, 0.22)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.38)',
              borderRadius: 50, padding: '6px 16px',
              color: 'black', fontSize: 30, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase',
              marginBottom: 24,
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#5b2fd5ff', display: 'inline-block',
                boxShadow: '0 0 8px 3px rgba(255,224,80,0.8)',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }} />
              Coming Soon
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(38px, 5.5vw, 64px)',
              fontWeight: 900, lineHeight: 1.12,
              color: 'white',
              textShadow: '0 3px 20px rgba(0,0,0,0.18)',
              marginBottom: 16,
            }}>
              Anytime is a <br />
              good time for <br />
              <span style={{
                background: 'linear-gradient(135deg, #FFE5B0, #FFD080, #FFC050)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 8px rgba(255,200,80,0.4))',
              }}>a cup of Coffee</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 15, fontWeight: 500, marginBottom: 36, lineHeight: 1.6 }}>
              Behind every great day is a cup of coffee.<br/>We're brewing something special — stay tuned.
            </p>

            {/* Divider label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: 15, marginBottom: 24 }}>
              <span style={{ width: 32, height: 2, background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.2))', borderRadius: 2 }} />
              Get notified first
            </div>

            {/* ── EMAIL FORM ── */}
            <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
              {!isClaimed ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div className="animate-pulse-glow" style={{
                    display: 'flex', alignItems: 'center',
                    background: 'rgba(255,255,255,0.94)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(212,160,90,0.4)',
                    borderRadius: 50, padding: '6px 6px 6px 0',
                  }}>
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                      style={{
                        flex: 1, background: 'none', border: 'none', outline: 'none',
                        color: '#3d1f08', fontSize: 14, fontWeight: 500,
                        padding: '10px 16px',
                        fontFamily: 'inherit',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="shine"
                      style={{
                        background: isSubmitting
                          ? '#a07040'
                          : 'linear-gradient(135deg, #7a4820, #C8875A, #E0A860)',
                        color: 'white', border: 'none', borderRadius: 50,
                        padding: '12px 28px', fontSize: 14, fontWeight: 700,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                        boxShadow: '0 4px 18px rgba(180,100,30,0.45)',
                        fontFamily: 'inherit',
                        transition: 'transform .2s',
                      }}
                      onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.04)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                    >
                      {isSubmitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: 'spinSlow 1s linear infinite' }}>
                            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                            <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </span>
                      ) : 'Notify me ✦'}
                    </button>
                  </div>
                  {emailError && (
                    <div className="animate-fade-up" style={{
                      position: 'absolute', bottom: -40, left: 16,
                      background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                      color: 'white', padding: '6px 14px', borderRadius: 10,
                      fontSize: 12, fontWeight: 500,
                      boxShadow: '0 4px 16px rgba(220,38,38,0.4)',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {emailError}
                    </div>
                  )}
                </form>
              ) : (
                <div className="animate-fade-up" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(212,160,90,0.4)', borderRadius: 50,
                  padding: '10px 20px', height: 60,
                  boxShadow: '0 8px 32px rgba(180,120,40,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7a4820, #D4925A)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(180,100,30,0.4)',
                    }}>
                      <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span style={{ color: '#3d1f08', fontWeight: 700, fontSize: 14 }}>You're on the list! 🎉</span>
                  </div>
                  <button onClick={() => { setEmail(''); setIsClaimed(false); }}
                    style={{ color: '#9a6030', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div style={{ position: 'relative', minHeight: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Outer slow-spinning dashed ring */}
            <div className="animate-spin-slow" style={{
              position: 'absolute', width: 380, height: 380, borderRadius: '50%',
              border: '1.5px dashed rgba(212,148,60,0.4)',
            }} />
            {/* Inner CCW ring */}
            <div className="animate-spin-ccw" style={{
              position: 'absolute', width: 310, height: 310, borderRadius: '50%',
              border: '1px dashed rgba(212,148,60,0.25)',
            }} />
            {/* Ripple 1 */}
            <div className="animate-ripple" style={{
              position: 'absolute', width: 260, height: 260, borderRadius: '50%',
              border: '2.5px solid rgba(212,148,60,0.3)',
            }} />
            {/* Ripple 2 (offset) */}
            <div className="animate-ripple" style={{
              position: 'absolute', width: 260, height: 260, borderRadius: '50%',
              border: '2px solid rgba(212,148,60,0.2)',
              animationDelay: '1.2s',
            }} />

            {/* ── MAIN GLASS CARD ── */}
            <div className="glass animate-pulse-glow" style={{
              position: 'relative',
              borderRadius: 32, padding: '32px 28px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
              minWidth: 290,
              boxShadow: '0 30px 70px rgba(140,80,20,0.2), 0 8px 24px rgba(140,80,20,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
            }}>
              {/* Animated top gradient bar */}
              <div className="grad-bar" style={{ width: '100%', height: 4, borderRadius: 4 }} />

              {/* Coffee cup (top-down view) */}
              <div style={{
                position: 'relative', width: 200, height: 200, borderRadius: '50%',
                background: 'linear-gradient(145deg, #f8f0e6, #ede0cf)',
                boxShadow: '0 16px 48px rgba(100,50,10,0.22), inset 0 -4px 12px rgba(0,0,0,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Saucer ring */}
                <div style={{
                  position: 'absolute', inset: 8, borderRadius: '50%',
                  background: 'linear-gradient(145deg, #eeddc8, #e0cdb8)',
                  boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.08)',
                }} />
                {/* Cup body */}
                <div style={{
                  position: 'relative', width: 148, height: 148, borderRadius: '50%',
                  background: 'linear-gradient(145deg, #ffffff, #f5ede2)',
                  border: '2.5px solid rgba(212,160,90,0.25)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Coffee liquid */}
                  <div style={{
                    width: 116, height: 116, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                    background: 'radial-gradient(circle at 32% 32%, #5C2800, #1A0B02)',
                    boxShadow: 'inset 0 6px 20px rgba(0,0,0,0.55)',
                  }}>
                    {/* Crema golden ring */}
                    <div style={{
                      position: 'absolute', inset: 8, borderRadius: '50%',
                      border: '3px solid rgba(180,110,30,0.5)',
                      boxShadow: '0 0 12px rgba(200,140,40,0.3)',
                    }} />
                    {/* Latte art swirl 1 */}
                    <div style={{
                      position: 'absolute', top: '18%', left: '18%',
                      width: '46%', height: '46%', borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(140,70,15,0.85), transparent)',
                      filter: 'blur(3px)',
                    }} />
                    {/* Latte art swirl 2 */}
                    <div style={{
                      position: 'absolute', top: '42%', right: '14%',
                      width: '36%', height: '36%', borderRadius: '50%',
                      background: 'rgba(90,40,8,0.65)',
                      filter: 'blur(4px)',
                    }} />
                    {/* Gold highlight */}
                    <div style={{
                      position: 'absolute', top: '10%', left: '16%',
                      width: '22%', height: '22%', borderRadius: '50%',
                      background: 'rgba(220,170,80,0.12)',
                      filter: 'blur(3px)',
                    }} />
                    {/* Specular highlight */}
                    <div style={{
                      position: 'absolute', top: '8%', right: '22%',
                      width: '14%', height: '14%', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.07)',
                      filter: 'blur(2px)',
                    }} />
                  </div>
                </div>
                {/* Cup handle */}
                <div style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) translateX(48px)',
                  width: 42, height: 58, borderRadius: '0 50% 50% 0',
                  background: 'linear-gradient(145deg, #f2e8da, #e2d2c0)',
                  border: '3px solid rgba(212,160,90,0.35)', borderLeft: 'none',
                  boxShadow: '4px 4px 10px rgba(0,0,0,0.12)',
                  zIndex: 1,
                }} />
              </div>

              {/* Label */}
              <div style={{ textAlign: 'center' }}>
                <p className="text-dark-coffee" style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>MeU Signature Blend</p>
                <p style={{ color: '#9a6838', fontSize: 12, fontWeight: 500 }}>Premium Specialty Coffee ✦</p>
              </div>

              
            </div>

            {/* ── FLOATING MINI CARDS ── */}
            {/* Card A: Fresh Brew */}
            <div className="glass-strong animate-card-float animate-fade-up" style={{
              position: 'absolute', top: '6%', right: '-5%',
              borderRadius: 18, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 12px 36px rgba(140,80,20,0.18)',
              '--dur': '5s',
              animationDelay: '0.2s',
            } as React.CSSProperties}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(212,148,60,0.18), rgba(212,148,60,0.36))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>☕</div>
              <div>
                <p style={{ color: '#3d1f08', fontWeight: 800, fontSize: 13, marginBottom: 2 }}>Fresh Brew</p>
                <p style={{ color: '#9a6838', fontSize: 11, fontWeight: 500 }}>100% Arabica</p>
              </div>
            </div>

           

            {/* Card C: Award */}
            <div className="glass-strong animate-card-float animate-fade-up" style={{
              position: 'absolute', top: '54%', right: '-9%',
              borderRadius: 18, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 12px 36px rgba(140,80,20,0.18)',
              '--dur': '7s', animationDelay: '0.8s',
            } as React.CSSProperties}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(180,140,60,0.2), rgba(212,180,60,0.38))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>🏆</div>
              <div>
                <p style={{ color: '#3d1f08', fontWeight: 800, fontSize: 13, marginBottom: 2 }}>Award 2025</p>
                <p style={{ color: '#9a6838', fontSize: 11, fontWeight: 500 }}>Best Blend</p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <footer style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontSize: 13, fontWeight: 600, position: 'relative', zIndex: 10 }}>
          {/* <div style={{ display: 'flex', gap: 32 }}>
            {['FAQ', 'Privacy Policy'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.82)')}
              >{l}</a>
            ))}
          </div> */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8a5020', textDecoration: 'none', transition: 'transform .2s, color .2s' }}
            title="Follow MeU Coffee on Instagram"
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.07)'; (e.currentTarget as HTMLAnchorElement).style.color = '#c07030'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLAnchorElement).style.color = '#8a5020'; }}
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.73.124 4.094 1.502 4.218 4.218.044.968.052 1.322.052 3.752 0 2.43-.008 2.784-.052 3.752-.124 2.73-1.502 4.094-4.218 4.218-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.73-.124-4.094-1.502-4.218-4.218-.044-.968-.052-1.322-.052-3.752 0-2.43.008-2.784.052-3.752.124-2.73 1.502-4.094 4.218-4.218.968-.044 1.322-.052 3.752-.052zm-1.127 1.833C9.07 3.9 8.784 3.91 7.973 3.947c-2.03.092-2.915.986-3.007 3.007-.037.81-.047 1.096-.047 3.202 0 2.106.01 2.392.047 3.202.092 2.03.986 2.916 3.007 3.007.81.037 1.096.047 3.202.047 2.106 0 2.392-.01 3.202-.047 2.03-.092 2.916-.986 3.007-3.007.037-.81.047-1.096.047-3.202 0-2.106-.01-2.392-.047-3.202-.092-2.03-.986-2.916-3.007-3.007-.81-.037-1.096-.047-3.202-.047-2.106 0-2.392.01-3.202.047zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-6 3 3 0 010 6zm4.75-7.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
            <span>Instagram</span>
          </a>
        </footer>
      </div>
    </main>
  );
};

export default ComingSoon;