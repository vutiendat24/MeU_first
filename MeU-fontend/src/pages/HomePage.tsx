import React, { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import type { UserInfo } from '../services/auth.service';

const HomePage: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [greeting, setGreeting] = useState('Chào mừng');

  useEffect(() => {
    // Đọc thông tin user từ localStorage
    const stored = localStorage.getItem('user_info');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // dữ liệu bị hỏng → redirect login
        window.location.href = '/login';
      }
    } else {
      window.location.href = '/login';
    }

    // Chào theo giờ trong ngày
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('Chào buổi sáng');
    else if (hour >= 12 && hour < 18) setGreeting('Chào buổi chiều');
    else setGreeting('Chào buổi tối');
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-10 h-10 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-slate-400 text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-5 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MeU</span>
        </div>

        {/* User chip */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <span className="text-white text-sm font-medium">{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all px-3 py-1.5 rounded-lg border border-transparent hover:border-white/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Welcome card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl text-center">
            {/* Avatar */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl mb-6 text-white text-3xl font-bold ring-4 ring-white/20">
              {initials}
            </div>

            {/* Greeting */}
            <p className="text-indigo-300 text-lg font-medium mb-1">{greeting},</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
              {user.name}! 👋
            </h1>
            <p className="text-slate-400 text-base">
              Bạn đã đăng nhập thành công vào tài khoản{' '}
              <span className="text-indigo-300 font-semibold">@{user.username}</span>
            </p>

            {/* Divider */}
            <div className="my-8 border-t border-white/10" />

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Email</p>
                <p className="text-white text-sm font-medium truncate">{user.email}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Giới tính</p>
                <p className="text-white text-sm font-medium capitalize">
                  {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Ngày sinh</p>
                <p className="text-white text-sm font-medium">
                  {user.dob
                    ? new Date(user.dob).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                    : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Subtle hint */}
          <p className="text-center text-slate-500 text-xs mt-6">
            © {new Date().getFullYear()} MeU · Tất cả quyền được bảo lưu
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
