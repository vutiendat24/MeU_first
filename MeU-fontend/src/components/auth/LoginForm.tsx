import React, { useState } from 'react';
import { authService } from '../../services/auth.service';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await authService.login(formData);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/'; 
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-200 text-gray-900 font-sans min-h-screen relative overflow-hidden flex flex-col">
            <header className="fixed top-0 w-full z-50 px-8 h-16 flex items-center justify-between pointer-events-none">
                <div className="text-xl font-bold text-blue-900 pointer-events-auto select-none">
                    SwiftRide
                </div>
                <div className="pointer-events-auto">
                    <a className="text-sm font-semibold text-blue-900 hover:bg-blue-200 transition-colors bg-blue-100 px-4 py-2 rounded-lg" href="/">
                        Quay lại Trang chủ
                    </a>
                </div>
            </header>

            <main className="relative z-10 flex-grow flex items-center justify-center p-4 md:p-0 mt-16 md:mt-0">
                <div className="w-full max-w-[440px] p-8 rounded-xl shadow-xl bg-white border border-gray-100">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Chào mừng trở lại</h1>
                        <p className="text-base text-gray-600">Vui lòng đăng nhập để tiếp tục.</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="font-semibold text-sm text-gray-800 flex items-center gap-1" htmlFor="username">
                                Tên đăng nhập
                            </label>
                            <input 
                                className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" 
                                id="username" 
                                name="username" 
                                placeholder="Nhập tên người dùng" 
                                required 
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="font-semibold text-sm text-gray-800 flex items-center gap-1" htmlFor="password">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input 
                                    className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Nhập mật khẩu" 
                                    required 
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button 
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors text-sm font-semibold" 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Ẩn' : 'Hiện'}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Ghi nhớ</span>
                            </label>
                            <a className="text-sm font-semibold text-blue-600 hover:underline transition-all" href="#">Quên mật khẩu?</a>
                        </div>

                        <button 
                            className="w-full h-12 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-xs font-semibold text-gray-500">HOẶC</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Chưa có tài khoản?{' '}
                            <a className="font-semibold text-blue-600 hover:underline" href="/register">Đăng ký ngay</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginForm;
