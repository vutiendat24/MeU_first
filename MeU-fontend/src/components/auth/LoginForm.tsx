import React, { useState, useCallback } from 'react';
import { authService } from '../../services/auth.service';

// ==================== Validation ====================
interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

interface FieldErrors {
  username?: string;
  password?: string;
}

const validateUsername = (value: string): string | undefined => {
  if (!value.trim()) return 'Tên đăng nhập không được để trống!';
  if (value.trim().length < 3) return 'Tên đăng nhập phải có ít nhất 3 ký tự!';
  if (value.trim().length > 30) return 'Tên đăng nhập không được vượt quá 30 ký tự!';
  if (!/^[a-zA-Z0-9_]+$/.test(value.trim()))
    return 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới!';
  return undefined;
};

const validatePassword = (value: string): string | undefined => {
  if (!value) return 'Mật khẩu không được để trống!';
  if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự!';
  return undefined;
};

const validateLoginForm = (data: LoginFormData): FieldErrors => {
  return {
    username: validateUsername(data.username),
    password: validatePassword(data.password),
  };
};

// ==================== Icons ====================
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

// ==================== Field Component ====================
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  touched: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FieldProps> = ({ id, label, error, touched, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    {children}
    {touched && error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ==================== Main Component ====================
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    remember: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fieldErrors = validateLoginForm(formData);
  const isFormValid = !fieldErrors.username && !fieldErrors.password;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setServerError(null);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched to show all errors
    setTouched({ username: true, password: true });

    if (!isFormValid) return;

    setIsLoading(true);
    setServerError(null);

    try {
      const data = await authService.login({
        username: formData.username,
        password: formData.password,
      });
      authService.saveSession(data);
      setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Đăng nhập thất bại. Vui lòng thử lại.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full h-12 px-4 rounded-xl border transition-all outline-none text-sm ${
      touched[field] && fieldErrors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : touched[field] && !fieldErrors[field]
        ? 'border-green-400 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
        : 'border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Chào mừng trở lại!</h1>
            <p className="text-sm text-gray-500 mt-1">Đăng nhập để tiếp tục sử dụng MeU</p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-2.5 animate-[fadeIn_0.2s_ease]">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {serverError}
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div className="mb-5 p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-start gap-2.5">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {/* Username */}
            <FormField
              id="username"
              label="Tên đăng nhập"
              error={fieldErrors.username}
              touched={!!touched.username}
            >
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('username')}
                disabled={isLoading}
              />
            </FormField>

            {/* Password */}
            <FormField
              id="password"
              label="Mật khẩu"
              error={fieldErrors.password}
              touched={!!touched.password}
            >
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass('password')} pr-11`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-0.5"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </FormField>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-all">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Divider & Register link */}
          <div className="mt-7">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Hoặc</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-5">
              Chưa có tài khoản?{' '}
              <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-all">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-5">
          © {new Date().getFullYear()} MeU · Tất cả quyền được bảo lưu
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
