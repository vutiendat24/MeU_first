import React, { useState } from 'react';
import { authService } from '../../services/auth.service';

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        gender: 'male',
        dob: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (formData.password !== formData.confirmPassword) {
                setError('Mật khẩu xác nhận không khớp!');
                setIsLoading(false);
                return;
            }

            await authService.register(formData);
            alert('Đăng ký thành công! Hãy đăng nhập.');
            window.location.href = '/login'; 
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-200 text-gray-900 font-sans min-h-screen relative flex flex-col">
            <main className="relative z-10 flex-grow flex items-center justify-center py-12 px-4 md:px-8">
                <div className="w-full max-w-[520px] rounded-xl shadow-xl p-6 md:p-12 flex flex-col gap-6 bg-white border border-gray-100">
                    <div className="flex flex-col items-center text-center gap-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-blue-800 tracking-tight">SwiftRide</h1>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Tạo tài khoản mới</h2>
                        <p className="text-base text-gray-600">Bắt đầu hành trình của bạn cùng chúng tôi</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm text-gray-800" htmlFor="name">Họ và tên</label>
                            <input 
                                className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                id="name" 
                                name="name" 
                                placeholder="Nguyễn Văn A" 
                                required 
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-sm text-gray-800" htmlFor="username">Tên đăng nhập</label>
                                <input 
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                    id="username" 
                                    name="username" 
                                    placeholder="user123" 
                                    required 
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-sm text-gray-800" htmlFor="email">Email</label>
                                <input 
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                    id="email" 
                                    name="email" 
                                    placeholder="vi-du@email.com" 
                                    required 
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-sm text-gray-800">Giới tính</label>
                                <div className="flex items-center gap-4 h-12 px-1">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500/20" 
                                            name="gender" 
                                            type="radio" 
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={handleChange}
                                        />
                                        <span className="text-gray-600 group-hover:text-blue-600 transition-colors">Nam</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500/20" 
                                            name="gender" 
                                            type="radio" 
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={handleChange}
                                        />
                                        <span className="text-gray-600 group-hover:text-blue-600 transition-colors">Nữ</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-sm text-gray-800" htmlFor="dob">Ngày sinh</label>
                                <input 
                                    className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                    id="dob" 
                                    name="dob" 
                                    required 
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-sm text-gray-800" htmlFor="password">Mật khẩu</label>
                                <div className="relative">
                                    <input 
                                        className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        required 
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-semibold" 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Ẩn' : 'Hiện'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="font-semibold text-sm text-gray-800" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                                <div className="relative">
                                    <input 
                                        className="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        placeholder="••••••••" 
                                        required 
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <button 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-semibold" 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-2">
                            <button 
                                className="w-full h-12 bg-orange-700 text-white font-semibold rounded-lg shadow-md hover:bg-orange-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Bạn đã có tài khoản?{' '}
                            <a className="text-blue-600 font-semibold hover:underline transition-all" href="/login">Đăng nhập ngay</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterForm;
