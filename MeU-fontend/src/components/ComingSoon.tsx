import React, { useState, useEffect } from 'react';

const LAUNCH_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const ComingSoon: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState<'khuyenmai' | 'trainghiem' | 'hoptac'>('khuyenmai');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [errors, setErrors] = useState<{name?: string, email?: string}>({});

  useEffect(() => {
    const tick = () => {
      const distance = LAUNCH_DATE.getTime() - Date.now();
      if (distance <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance % 86_400_000) / 3_600_000),
        minutes: Math.floor((distance % 3_600_000) / 60_000),
        seconds: Math.floor((distance % 60_000) / 1_000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const validateName = (val: string) => {
    if (!val.trim()) return 'Vui lòng nhập họ và tên.';
    if (val.trim().length < 2) return 'Tên phải có ít nhất 2 ký tự.';
    if (val.trim().length > 50) return 'Tên không được vượt quá 50 ký tự.';
    return '';
  };

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Vui lòng nhập địa chỉ email.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) return 'Vui lòng nhập email hợp lệ (vd: name@gmail.com).';
    if (val.trim().length > 100) return 'Email không được vượt quá 100 ký tự.';
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (errors.name !== undefined) {
      setErrors(prev => ({ ...prev, name: validateName(val) }));
    }
  };

  const handleNameBlur = () => {
    setErrors(prev => ({ ...prev, name: validateName(name) }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email !== undefined) {
      setErrors(prev => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handleEmailBlur = () => {
    setErrors(prev => ({ ...prev, email: validateEmail(email) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);

    if (nameErr || emailErr) {
      setErrors({ name: nameErr, email: emailErr });
      return;
    }

    console.log({ name, email, reason });
    setSubmitted(true);
  };

  const reasons = [
    { key: 'khuyenmai' as const, title: 'Nhận ưu đãi & khuyến mãi', sub: 'Dành cho khách mua lẻ' },
    { key: 'trainghiem' as const, title: 'Trải nghiệm sản phẩm mới', sub: 'Thử trước khi ra mắt' },
    { key: 'hoptac' as const, title: 'Hợp tác kinh doanh', sub: 'Nhượng quyền / Bỏ sỉ hạt cà phê' },
  ];

  const CountdownBlock = ({ compact = false }: { compact?: boolean }) => (
    <div className={compact ? 'flex gap-2 items-end' : 'flex gap-5 items-end'}>
      {[
        { val: pad(timeLeft.days), label: 'Ngày' },
        { val: pad(timeLeft.hours), label: 'Giờ' },
        { val: pad(timeLeft.minutes), label: 'Phút' },
        { val: pad(timeLeft.seconds), label: 'Giây' },
      ].map(({ val, label }, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center">
            <div
              className="flex items-center justify-center rounded"
              style={{
                background: '#181818',
                border: '1px solid #2a2a2a',
                minWidth: compact ? 58 : 88,
                padding: compact ? '9px 12px' : '14px 18px',
              }}
            >
              <span
                className="font-mono font-bold tabular-nums"
                style={{ fontSize: compact ? 26 : 42, color: '#ba7a48', lineHeight: 1 }}
              >
                {val}
              </span>
            </div>
            <span
              className="uppercase font-semibold mt-2"
              style={{ fontSize: compact ? 9 : 10, letterSpacing: 2, color: '#444' }}
            >
              {label}
            </span>
          </div>
          {i < 3 && (
            <span
              className="font-bold mb-8"
              style={{ color: '#2e2e2e', fontSize: compact ? 20 : 30 }}
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen w-full flex items-stretch overflow-hidden"
      style={{ backgroundColor: '#111111', color: '#fff', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
    >
      {/* ═══════════ LEFT PANEL ═══════════ */}
      <div className="hidden lg:flex flex-col w-1/2 px-16 py-14" style={{ borderRight: '1px solid #1c1c1c' }}>

        {/* Logo */}
        <div>
          <img
            src="https://coffee.meu-solutions.com/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75"
            alt="Odd Coffee Logo"
            style={{ height: 72, width: 'auto', objectFit: 'contain' }}
          />
          <div
            className="mt-3 italic"
            style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#555' }}
          >
            Oddly good coffee, surprisingly real
          </div>
        </div>

        {/* ── Countdown TRUNG TÂM ── */}
        <div className="flex-1 flex flex-col justify-center">
          <div
            className="mb-6 uppercase font-semibold"
            style={{ fontSize: 11, letterSpacing: 3, color: '#ba7a48' }}
          >
            Đang đếm ngược đến ngày ra mắt
          </div>

          <CountdownBlock />

          {/* Divider */}
          <div className="my-10" style={{ height: 1, background: '#1e1e1e' }} />

          {/* Headline */}
          <div
            className="uppercase font-semibold mb-5"
            style={{ fontSize: 11, letterSpacing: 3, color: '#444' }}
          >
            Chuẩn bị cho ngày ra mắt
          </div>
          <h1
            className="font-normal leading-snug"
            style={{ fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: 46, color: '#fff' }}
          >
            Bold Vietnamese<br />Coffee, with{' '}
            <span style={{ color: '#ba7a48' }}>Unexpectedly</span>
            <br />Memorable Moments.
          </h1>
          <p className="mt-5" style={{ fontSize: 15, color: '#555', lineHeight: 1.8, maxWidth: 380 }}>
            Một tách cà phê Việt Nam đậm đà, mang những khoảnh khắc quen thuộc và bất ngờ khó quên trong mỗi ngụm uống.
          </p>
        </div>

        {/* Footer tagline */}
        <div style={{ fontSize: 11, color: '#2e2e2e' }}>coffee.meu-solutions.com</div>
      </div>

      {/* ═══════════ RIGHT PANEL (Form) ═══════════ */}
      <div className="flex-1 flex flex-col justify-center items-center px-10 md:px-20 py-10" style={{ backgroundColor: '#111111' }}>

        {/* Mobile: logo + countdown */}
        <div className="lg:hidden mb-8">
          <img
            src="https://coffee.meu-solutions.com/_next/image?url=%2Fimages%2Flogo.png&w=640&q=75"
            alt="Odd Coffee Logo"
            style={{ height: 52, width: 'auto', objectFit: 'contain', marginBottom: 8 }}
          />
          <p className="italic mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 12, color: '#555' }}>
            Oddly good coffee, surprisingly real
          </p>
          <CountdownBlock compact />
        </div>

        {submitted ? (
          <div style={{ maxWidth: 400 }}>
            <div
              className="flex items-center justify-center rounded-full mb-6"
              style={{ width: 48, height: 48, background: 'rgba(186,122,72,0.15)' }}
            >
              <svg width={24} height={24} fill="none" stroke="#ba7a48" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Times New Roman', serif", fontSize: 26, fontWeight: 400, color: '#fff', marginBottom: 10 }}>
              Đã nhận thông tin!
            </h2>
            <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>
              Cảm ơn <span style={{ color: '#ba7a48', fontWeight: 600 }}>{name}</span>. Chúng tôi sẽ
              gửi thông báo đến <span style={{ color: '#ba7a48' }}>{email}</span> ngay khi ra mắt.
            </p>
          </div>
        ) : (
          <div className="w-full" style={{ maxWidth: 600 }}>
            <h2
              className="mb-2"
              style={{ fontFamily: "'Times New Roman', serif", fontSize: 34, fontWeight: 400, color: '#fff' }}
            >
              Nhận thông báo sớm nhất
            </h2>
            <p className="mb-7" style={{ fontSize: 17, color: '#555', lineHeight: 1.7 }}>
              Đừng bỏ lỡ ưu đãi đặc quyền dành cho người đăng ký đầu tiên.
            </p>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* Name */}
              <div>
                <label
                  className="block mb-2 font-semibold uppercase"
                  style={{ fontSize: 13, letterSpacing: 2, color: '#ba7a48' }}
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  placeholder="Nhập tên của bạn..."
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: '#181818', border: `1px solid ${errors.name ? '#e65c5c' : '#2a2a2a'}`, borderRadius: 4,
                    padding: '16px 18px', fontSize: 17, color: '#fff', outline: 'none',
                    transition: 'border-color .2s',
                  }}
                  onFocus={e => { if (!errors.name) e.currentTarget.style.borderColor = '#ba7a48'; }}
                  onMouseLeave={e => { if (!errors.name && document.activeElement !== e.target) e.currentTarget.style.borderColor = '#2a2a2a'; }}
                />
                {errors.name && (
                  <p style={{ color: '#e65c5c', fontSize: 13, marginTop: 6, fontWeight: 500 }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-2 font-semibold uppercase"
                  style={{ fontSize: 13, letterSpacing: 2, color: '#ba7a48' }}
                >
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="Nhập địa chỉ email..."
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: '#181818', border: `1px solid ${errors.email ? '#e65c5c' : '#2a2a2a'}`, borderRadius: 4,
                    padding: '16px 18px', fontSize: 17, color: '#fff', outline: 'none',
                    transition: 'border-color .2s',
                  }}
                  onFocus={e => { if (!errors.email) e.currentTarget.style.borderColor = '#ba7a48'; }}
                  onMouseLeave={e => { if (!errors.email && document.activeElement !== e.target) e.currentTarget.style.borderColor = '#2a2a2a'; }}
                />
                {errors.email && (
                  <p style={{ color: '#e65c5c', fontSize: 13, marginTop: 6, fontWeight: 500 }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Reason cards */}
              <div>
                <label
                  className="block mb-2.5 font-semibold uppercase"
                  style={{ fontSize: 13, letterSpacing: 2, color: '#ba7a48' }}
                >
                  Lý do đăng ký
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {reasons.map(r => {
                    const active = reason === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setReason(r.key)}
                        style={{
                          width: '100%', textAlign: 'left',
                          padding: '14px 18px', borderRadius: 4,
                          border: `1px solid ${active ? '#ba7a48' : '#242424'}`,
                          background: active ? 'rgba(186,122,72,0.07)' : '#181818',
                          cursor: 'pointer', transition: 'all .2s',
                          display: 'flex', alignItems: 'center', gap: 14,
                        }}
                        onMouseEnter={e => { if (!active) (e.currentTarget.style.borderColor = '#383838'); }}
                        onMouseLeave={e => { if (!active) (e.currentTarget.style.borderColor = '#242424'); }}
                      >
                        {/* Radio dot */}
                        <div style={{
                          width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                          border: `2px solid ${active ? '#ba7a48' : '#383838'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'border-color .2s',
                        }}>
                          {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ba7a48' }} />}
                        </div>
                        <div>
                          <p style={{ fontSize: 17, fontWeight: 600, color: active ? '#fff' : '#888', margin: 0 }}>
                            {r.title}
                          </p>
                          <p style={{ fontSize: 14, color: '#444', margin: '4px 0 0' }}>{r.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                style={{
                  width: '100%', background: '#ba7a48', color: '#fff',
                  border: 'none', borderRadius: 4, padding: '19px',
                  fontSize: 16, fontWeight: 700, letterSpacing: 2.5,
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'background .2s, transform .1s',
                  boxShadow: '0 4px 20px rgba(186,122,72,0.25)',
                  marginTop: 4,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#ca8a58')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ba7a48')}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Nhận ưu đãi ngay
              </button>
            </form>

            <p className="text-center mt-5" style={{ fontSize: 13, color: '#333' }}>
              Không spam. Bạn có thể huỷ bất cứ lúc nào.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
