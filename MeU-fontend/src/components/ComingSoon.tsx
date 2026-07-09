import React, { useState } from 'react';
import cafeBarImg from '../assets/images/cafeBar.jpg';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Hàm validate chi tiết của bạn
  const validateEmail = (val: string) => {
    const t = val.trim();
    if (!t)                                       return 'Please enter your email address.';
    if (t.length > 50)                            return 'Email must not exceed 50 characters.';
    
    const [local, domain, ...rest] = t.split('@');
    if (rest.length > 0 || !local || !domain)     return 'Invalid email: must contain exactly one "@".';
    if (!/^[a-zA-Z0-9]/.test(local))              return 'Email must start with a letter or number.';
    if (!/[a-zA-Z0-9]$/.test(local))              return 'The part before "@" must end with a letter or number.';
    if (!/^[a-zA-Z0-9._-]+$/.test(local))         return 'Email may only contain letters, digits, ".", "_", "-".';
    if (/[._-]{2,}/.test(local))                  return 'Email must not have consecutive special characters.';
    if (!/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(domain)) return 'Invalid domain (e.g. gmail.com).';
    if (/\.{2,}/.test(domain))                    return 'Domain must not contain consecutive dots.';
    
    return '';
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Chạy hàm validate
    const errorMessage = validateEmail(email);
    
    // 2. Nếu có lỗi -> Cập nhật state error và dừng luồng
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    // 3. No error -> clear old error and call API
    setError('');
    alert(`Notification sent to: ${email}`);
    
    // Clear form on success
    setEmail('');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans text-gray-900 bg-[#faf9f6]">
      
      {/* LEFT SIDE - CONTENT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-16 lg:p-24">
        
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter">odd</h1>
        </div>

        <div className="max-w-xl my-16 md:my-0">
          <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mb-4 block">
            Coming Soon
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            A New Flavor Is Being Crafted.
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed text-base md:text-lg">
            We're perfecting every detail. Join our inner circle to receive
            an exclusive invitation to our grand opening. Handcrafted flavors,
            real ingredients — in a refined urban sanctuary.
          </p>

          {/* Form Area */}
          <form onSubmit={handleSubscribe} className="flex flex-col mb-1 relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text" // Chuyển type="email" thành "text" để trình duyệt không tự chặn bằng tooltip mặc định, nhường quyền validate cho hàm của bạn
                placeholder="[ Email Address ]"
                // Đổi màu viền thành đỏ nếu có lỗi
                className={`flex-1 px-5 py-4 bg-transparent border ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:border-black focus:ring-black'
                } rounded-none text-sm focus:outline-none focus:ring-1 placeholder-gray-400 transition-colors`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
              <button
                type="submit"
                className="px-8 py-4 bg-black text-white text-sm font-semibold tracking-wide hover:bg-gray-800 transition-colors rounded-none whitespace-nowrap"
              >
                RESERVE YOUR SPOT
              </button>
            </div>
            
            {/* Hiển thị câu thông báo lỗi ở đây */}
            <div className="h-6 mt-2">
              {error && (
                <span className="text-sm text-red-500 font-medium animate-pulse">
                  * {error}
                </span>
              )}
            </div>
          </form>
          
        </div>

        <div className="mt-8 md:mt-0">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase block mb-2">
            Visit Us At
          </span>
          <p className="text-sm font-medium text-gray-800">
            03 Song Thao St, Ward 2, Tan Binh District
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - VISUAL PANEL */}
      <div
        className="w-full md:w-1/2 h-[50vh] md:h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${cafeBarImg})`,
        }}
      ></div>
      
    </div>
  );
};

export default ComingSoon;