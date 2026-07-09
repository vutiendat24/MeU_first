import React, { useState } from 'react';

const ComingSoon: React.FC = () => {
  // Form State
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Please enter your email address.';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(trimmed)) {
      return 'Please enter a valid email address (e.g., name@gmail.com).';
    }
    if (val.length > 100) {
      return 'Email must not exceed 100 characters.';
    }
    return '';
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);

    if (eErr) {
      setEmailError(eErr);
      return;
    }

    setIsSubmitting(true);
    // Simulate API subscription saving
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsClaimed(true);
  };

  return (
    <main className="relative w-full min-h-screen bg-white font-sans text-gray-800 overflow-hidden flex flex-col selection:bg-[#BA8E6B] selection:text-white">
      
      {/* Wavy Background (SVG) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg 
          viewBox="0 0 1440 1024" 
          className="w-full h-full object-cover" 
          preserveAspectRatio="none"
        >
          {/* 
            Draws the tan shape on the left that curves into the white side.
            Adjusted bezier curves to match the T Cafe mockup.
          */}
          <path 
            fill="#C8A17D" 
            d="M0,0 L0,1024 L850,1024 C1100,750 550,550 700,250 C800,50 600,0 550,0 Z"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto min-h-screen flex flex-col p-6 md:p-10 lg:p-16">
        
        {/* Navbar */}
        <header className="flex justify-between items-center w-full mb-16 lg:mb-24">
          {/* Logo */}
          <div className="flex items-center gap-3 text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              {/* Custom Cup shape */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="font-bold text-2xl tracking-wide">MeU Coffee</span>
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center gap-8 text-gray-400 font-medium text-sm">
            <a href="#" className="hover:text-gray-600 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-600 transition-colors">About</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Shop</a>
            <button className="flex items-center gap-2 bg-[#C8A17D] hover:bg-[#b08b68] text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-[#C8A17D]/30 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Order Now
            </button>
          </div>
        </header>

        {/* 2-Column Content Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Content (Text & Form) */}
          <div className="flex flex-col items-start pr-0 lg:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-sm">
              Anytime is a <br className="hidden md:block" />
              good time for <br className="hidden md:block" />
              a cup of Coffee
            </h1>
            <p className="text-white/90 text-sm md:text-base font-medium mb-12">
              Behind every great day is a cup of coffee
            </p>

            <div className="flex items-center gap-4 text-white font-bold text-lg mb-8">
              <span className="w-8 h-0.5 bg-white"></span>
              Coming Soon
            </div>

            <h3 className="text-white font-bold text-xl mb-6">
              Get notified when we launch
            </h3>

            {/* Form */}
            <div className="w-full max-w-md relative">
              {!isClaimed ? (
                <form onSubmit={handleClaimSubmit} className="flex flex-col relative w-full">
                  <div className="bg-white rounded-full flex items-center p-1.5 shadow-lg relative z-20">
                    <input
                      type="text"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your Email Address"
                      className="flex-1 bg-transparent border-none text-gray-700 placeholder-gray-400 px-4 py-3 text-sm focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#C8A17D] hover:bg-[#b08b68] text-white px-8 py-3 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
                    >
                      {isSubmitting ? '...' : 'Notify me'}
                    </button>
                  </div>
                  {/* Absolute error message so it doesn't break the layout */}
                  {emailError && (
                    <div className="absolute -bottom-8 left-4 text-white bg-red-500/90 px-3 py-1 rounded-md text-xs shadow-md animate-fade-in">
                      {emailError}
                      {/* Triangle pointer */}
                      <div className="absolute -top-1 left-4 w-2 h-2 bg-red-500/90 transform rotate-45"></div>
                    </div>
                  )}
                </form>
              ) : (
                <div className="bg-white rounded-full flex items-center justify-between p-2 px-6 shadow-lg relative z-20 h-[60px]">
                  <div className="flex items-center gap-3 text-[#C8A17D]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-sm font-bold text-gray-700">Notified successfully!</span>
                  </div>
                  <button 
                    onClick={() => {
                      setEmail('');
                      setIsClaimed(false);
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Content (Images/CSS Art placeholders) */}
          <div className="relative h-full min-h-[400px] flex items-center justify-center">
            
            {/* Top Down Coffee Cup CSS Placeholder */}
            <div className="relative w-64 h-64 bg-stone-100 rounded-full shadow-2xl flex items-center justify-center border border-stone-200">
              {/* Saucer rim shadow */}
              <div className="absolute inset-2 rounded-full shadow-inner bg-stone-50"></div>
              
              {/* Cup */}
              <div className="relative w-40 h-40 bg-white rounded-full shadow-md flex items-center justify-center border border-stone-100 z-10">
                {/* Coffee Liquid */}
                <div className="w-32 h-32 bg-[#1A0B02] rounded-full shadow-inner border-4 border-[#3D1A04] relative overflow-hidden">
                  {/* Crema bubbles placeholder */}
                  <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-[#3D1A04] blur-sm opacity-60"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#522507] blur-md opacity-40"></div>
                </div>
              </div>
              
              {/* Cup Handle */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-16 border-4 border-stone-200 rounded-r-3xl z-0 bg-white shadow-sm"></div>
            </div>

            {/* Coffee Beans CSS Art Placeholders */}
            <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none opacity-90">
              {/* Several bean shapes scattered */}
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-[#5C3A21] rounded-full shadow-lg border border-[#3A2211] overflow-hidden"
                  style={{
                    width: `${Math.random() * 15 + 20}px`,
                    height: `${Math.random() * 10 + 25}px`,
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                >
                  {/* Bean middle crack */}
                  <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#29160A] transform -translate-y-1/2 rounded-full scale-y-150 rotate-3"></div>
                  {/* Bean highlight */}
                  <div className="absolute top-1 left-2 w-2 h-4 bg-white/10 blur-[1px] rounded-full transform rotate-12"></div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer Links */}
        <footer className="mt-auto pt-10 flex items-center justify-between w-full text-white/80 text-sm font-semibold relative z-10">
          <div className="flex items-center gap-10">
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
          <div>
            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              title="Follow MeU Coffee on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.73.124 4.094 1.502 4.218 4.218.044.968.052 1.322.052 3.752 0 2.43-.008 2.784-.052 3.752-.124 2.73-1.502 4.094-4.218 4.218-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.73-.124-4.094-1.502-4.218-4.218-.044-.968-.052-1.322-.052-3.752 0-2.43.008-2.784.052-3.752.124-2.73 1.502-4.094 4.218-4.218.968-.044 1.322-.052 3.752-.052zm-1.127 1.833C9.07 3.9 8.784 3.91 7.973 3.947c-2.03.092-2.915.986-3.007 3.007-.037.81-.047 1.096-.047 3.202 0 2.106.01 2.392.047 3.202.092 2.03.986 2.916 3.007 3.007.81.037 1.096.047 3.202.047 2.106 0 2.392-.01 3.202-.047 2.03-.092 2.916-.986 3.007-3.007.037-.81.047-1.096.047-3.202 0-2.106-.01-2.392-.047-3.202-.092-2.03-.986-2.916-3.007-3.007-.81-.037-1.096-.047-3.202-.047-2.106 0-2.392.01-3.202.047zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.5a3 3 0 110-6 3 3 0 010 6zm4.75-7.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
};

export default ComingSoon;