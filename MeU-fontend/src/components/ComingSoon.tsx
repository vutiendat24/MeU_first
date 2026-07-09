import React from 'react';
import barAreaImage from '../assets/images/bar-area.webp';
import outdoorAreaImage from '../assets/images/outdoor-area.webp';
import oddLogoImage from '../assets/images/odd-logo.webp';

const ComingSoon: React.FC = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <main className="w-full min-h-screen bg-[#F9F8F6] text-[#2C2A26] font-sans selection:bg-[#D45934] selection:text-white">
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden font-sans">

        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={barAreaImage}
            alt="Odd Coffee Interior"
            className="w-full h-full object-cover"
          />
          {/* Lớp phủ màu đen với độ mờ 50% giúp chữ trắng dễ đọc hơn */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl">

          {/* Subtitle */}
          <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] font-medium mb-6">
            Coming Soon
          </p>

          {/* Main Title */}
          <h1 className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.1] tracking-tight mb-6">
            Something Special<br />
            is Brewing
          </h1>

          {/* Description */}
          <p className="text-white/80 font-semibold text-sm md:text-base mb-10 leading-relaxed font-light">
            Bold Vietnamese coffee with unexpected flavors.<br />
            Opening your neighborhood soon.
          </p>

          {/* Call to Action Button */}
          <button
            className="bg-white text-black px-10 py-4 text-xs md:text-sm  uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors duration-300"
          >
            Get Early Access
          </button>
        </div>

        {/* Scroll Down Indicator (Mũi tên chĩa xuống ở đáy màn hình) */}
        <div
          onClick={scrollToBottom}
          className="absolute bottom-8 z-10 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

      </section>
      {/* SECTION 2: STORY */}
      <section className="w-full flex flex-col md:flex-row items-center min-h-[70vh] bg-[#fafaf8] font-sans">

        {/* CỘT TRÁI - HÌNH ẢNH */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh]">
          <img
            src={outdoorAreaImage}
            alt="Odd Coffee Outdoor Area"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* CỘT PHẢI - NỘI DUNG */}
        <div className="w-full md:w-1/2 flex items-center justify-start p-8 sm:p-12 lg:py-20 lg:pr-20 md:pl-[10%]">

          {/* KHỐI CHỮ - Giới hạn chiều rộng để text có độ ngắt dòng giống ảnh gốc */}
          <div className="w-full max-w-[460px]">

            <h2 className="text-4xl md:text-[3.25rem] font-medium text-black leading-[1.2] tracking-tight mb-5">
              “A Little Odd.<br />
              A Lot Real.”
            </h2>

            {/* Đường gạch ngang */}
            <div className="w-12 h-[1px] bg-black mb-8"></div>

            {/* Cụm văn bản */}
            <div className="space-y-5 text-[#5A5A5A] text-[15px] leading-[1.8] font-light mb-10">
              <p>
                We believe coffee should be an experience — not just a ritual.
              </p>
              <p>
                Odd Coffee brings bold Vietnamese flavors and unexpected combinations into everyday moments. Real ingredients. Real stories. Real good.
              </p>
            </div>

            {/* Địa chỉ */}
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-[#8B8B8B] mb-2">
                Coming To
              </span>
              <span className="text-sm md:text-[15px] font-medium text-black tracking-wide">
                822G Rockville Pk, Rockville, MD
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION 3: NEWSLETTER */}
      <div className="font-sans">

        {/* SECTION 3: NEWSLETTER */}
        <section className="w-full bg-white py-24 md:py-32 px-4 flex flex-col items-center justify-center text-center">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-medium text-black mb-4 tracking-tight">
            Be the First to Know
          </h2>

          {/* Subtitle */}
          <p className="text-[#5A5A5A] text-sm md:text-base leading-relaxed max-w-md mb-10">
            Subscribe for exclusive promotions and updates<br className="hidden md:block" />
            before our grand opening.
          </p>

          {/* Form Container */}
          <form className="w-full max-w-md flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 px-4 py-4 text-sm focus:outline-none focus:border-black placeholder:text-gray-400 transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-[#8B8B8B] mt-8">
            We respect your privacy. Unsubscribe anytime.
          </p>

        </section>

        {/* SECTION 4: FOOTER */}
        {/* Nền xám rất nhạt để phân biệt với phần trắng ở trên */}
        <section className="w-full bg-[#FBFBFB] py-20 px-4 flex flex-col items-center justify-center text-center">

          {/* Logo */}
          <div className="mb-10">
            {/* Bạn cần thay thế src bằng hình ảnh logo dạng tròn có chữ uốn cong của Odd Coffee */}
            <img
              src={oddLogoImage}
              alt="Odd Coffee Logo"
              className="w-40 md:w-48 h-auto object-contain mx-auto"
            />
          </div>

          {/* Social Icon (Instagram) */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-black hover:text-gray-600 transition-colors mb-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>

          {/* Address */}
          <p className="text-[#5A5A5A] text-sm mb-6">
            822G Rockville Pk, Rockville, MD, 20850
          </p>

          {/* Tiny Divider Line */}
          <div className="w-8 h-[1px] bg-gray-300 mb-6"></div>

          {/* Copyright */}
          <p className="text-[#8B8B8B] text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium">
            © 2026 ODD COFFEE. ALL RIGHTS RESERVED.
          </p>

        </section>

      </div>
    </main>
  );
};

export default ComingSoon;