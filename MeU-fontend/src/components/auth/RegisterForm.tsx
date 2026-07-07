import React, { useState, useCallback } from 'react';
import { authService } from '../../services/auth.service';

// ==================== Types ====================
interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: string;
  address: string;
}

interface FieldErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
  gender?: string;
  address?: string;
}

// ==================== Validators ====================
const validateName = (v: string) => {
  if (!v.trim()) return 'Họ và tên không được để trống!';
  if (v.trim().length < 2) return 'Họ và tên phải có ít nhất 2 ký tự!';
  if (v.trim().length > 100) return 'Họ và tên không được vượt quá 100 ký tự!';
  return undefined;
};

const validateUsername = (v: string) => {
  if (!v.trim()) return 'Tên đăng nhập không được để trống!';
  if (v.trim().length < 3) return 'Tên đăng nhập phải có ít nhất 3 ký tự!';
  if (v.trim().length > 30) return 'Tên đăng nhập không được vượt quá 30 ký tự!';
  if (!/^[a-zA-Z0-9_]+$/.test(v.trim()))
    return 'Chỉ được dùng chữ cái, số và dấu gạch dưới!';
  return undefined;
};

const validateEmail = (v: string) => {
  if (!v.trim()) return 'Email không được để trống!';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Email không đúng định dạng!';
  if (v.trim().length > 255) return 'Email không được vượt quá 255 ký tự!';
  return undefined;
};

const validatePassword = (v: string) => {
  if (!v) return 'Mật khẩu không được để trống!';
  if (v.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự!';
  if (v.length > 64) return 'Mật khẩu không được vượt quá 64 ký tự!';
  if (!/(?=.*[a-z])/.test(v)) return 'Mật khẩu phải chứa ít nhất 1 chữ thường!';
  if (!/(?=.*[A-Z])/.test(v)) return 'Mật khẩu phải chứa ít nhất 1 chữ hoa!';
  if (!/(?=.*\d)/.test(v)) return 'Mật khẩu phải chứa ít nhất 1 chữ số!';
  return undefined;
};

const validateConfirmPassword = (v: string, password: string) => {
  if (!v) return 'Vui lòng xác nhận mật khẩu!';
  if (v !== password) return 'Mật khẩu xác nhận không khớp!';
  return undefined;
};

const validateDob = (v: string) => {
  if (!v) return 'Ngày sinh không được để trống!';
  const birth = new Date(v);
  const today = new Date();
  if (birth > today) return 'Ngày sinh không thể là ngày trong tương lai!';
  const age =
    today.getFullYear() -
    birth.getFullYear() -
    (today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
      ? 1
      : 0);
  if (age < 13) return 'Bạn phải đủ 13 tuổi để đăng ký!';
  if (age > 120) return 'Ngày sinh không hợp lệ!';
  return undefined;
};

const validateGender = (v: string) => {
  if (!v) return 'Vui lòng chọn giới tính!';
  return undefined;
};

const validateAddress = (v: string) => {
  if (!v.trim()) return 'Địa chỉ không được để trống!';
  if (v.trim().length < 5) return 'Địa chỉ phải có ít nhất 5 ký tự!';
  if (v.trim().length > 200) return 'Địa chỉ không được vượt quá 200 ký tự!';
  return undefined;
};

const validateForm = (data: RegisterFormData): FieldErrors => ({
  name: validateName(data.name),
  username: validateUsername(data.username),
  email: validateEmail(data.email),
  password: validatePassword(data.password),
  confirmPassword: validateConfirmPassword(data.confirmPassword, data.password),
  dob: validateDob(data.dob),
  gender: validateGender(data.gender),
  address: validateAddress(data.address),
});

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

// ==================== Password Strength ====================
const PasswordStrength = ({ password }: { password: string }) => {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['', 'Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
  const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  const textColors = ['', 'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-600'];
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= score ? colors[score] : 'bg-gray-200'}`} />
        ))}
      </div>
      <p className={`text-xs font-medium ${textColors[score]}`}>{labels[score]}</p>
    </div>
  );
};

// ==================== Field Component ====================
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  touched: boolean;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FieldProps> = ({ id, label, error, touched, required = true, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {touched && error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5 animate-[fadeIn_0.15s_ease]">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

// ==================== Main Component ====================
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: '',
    address: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fieldErrors = validateForm(formData);
  const isFormValid = Object.values(fieldErrors).every((e) => !e);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setServerError(null);
    },
    [],
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark ALL fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Record<string, boolean>,
    );
    setTouched(allTouched);

    if (!isFormValid) {
      const firstError = Object.values(fieldErrors).find((e) => e);
      setServerError(firstError || null);
      return;
    }

    setIsLoading(true);
    setServerError(null);

    try {
      await authService.register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
      });
      setSuccessMsg('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Đăng ký thất bại. Vui lòng thử lại.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full h-11 px-4 rounded-xl border transition-all outline-none text-sm ${
      touched[field] && fieldErrors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : touched[field] && !fieldErrors[field]
        ? 'border-green-400 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200'
        : 'border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
    }`;

  // Max date = today - 13 years
  const maxDob = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 13);
    return d.toISOString().split('T')[0];
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 py-10">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[560px]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo tài khoản mới</h1>
            <p className="text-sm text-gray-500 mt-1">Điền đầy đủ thông tin để đăng ký</p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-2.5">
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Full Name */}
            <FormField id="name" label="Họ và tên" error={fieldErrors.name} touched={!!touched.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('name')}
                disabled={isLoading}
              />
            </FormField>

            {/* Username & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField id="username" label="Tên đăng nhập" error={fieldErrors.username} touched={!!touched.username}>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="user_123"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('username')}
                  disabled={isLoading}
                />
              </FormField>
              <FormField id="email" label="Email" error={fieldErrors.email} touched={!!touched.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('email')}
                  disabled={isLoading}
                />
              </FormField>
            </div>

            {/* Password */}
            <FormField id="password" label="Mật khẩu" error={fieldErrors.password} touched={!!touched.password}>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
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
              {formData.password && <PasswordStrength password={formData.password} />}
              {!touched.password && !formData.password && (
                <p className="text-xs text-gray-400 mt-0.5">
                  Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số.
                </p>
              )}
            </FormField>

            {/* Confirm Password */}
            <FormField id="confirmPassword" label="Xác nhận mật khẩu" error={fieldErrors.confirmPassword} touched={!!touched.confirmPassword}>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass('confirmPassword')} pr-11`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-0.5"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
            </FormField>

            {/* Gender & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender */}
              <FormField id="gender" label="Giới tính" error={fieldErrors.gender} touched={!!touched.gender}>
                <div className="flex gap-3 h-11 items-center px-2">
                  {[
                    { value: 'male', label: 'Nam' },
                    { value: 'female', label: 'Nữ' },
                    { value: 'other', label: 'Khác' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer group select-none">
                      <input
                        type="radio"
                        name="gender"
                        value={opt.value}
                        checked={formData.gender === opt.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                        disabled={isLoading}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FormField>

              {/* Date of Birth */}
              <FormField id="dob" label="Ngày sinh" error={fieldErrors.dob} touched={!!touched.dob}>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  max={maxDob}
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('dob')}
                  disabled={isLoading}
                />
              </FormField>
            </div>

            {/* Address */}
            <FormField id="address" label="Địa chỉ" error={fieldErrors.address} touched={!!touched.address}>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass('address')}
                disabled={isLoading}
              />
            </FormField>

            {/* Progress indicator */}
            {!successMsg && (
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-400">
                  Đã điền:{' '}
                  <span className="font-semibold text-indigo-600">
                    {Object.values(formData).filter((v) => v !== '').length}
                  </span>
                  /{Object.keys(formData).length} trường
                </div>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{
                      width: `${(Object.values(formData).filter((v) => v !== '').length / Object.keys(formData).length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

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
                'Đăng ký tài khoản'
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6">
            <div className="relative flex items-center mb-5">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Hoặc</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>
            <p className="text-center text-sm text-gray-500">
              Đã có tài khoản?{' '}
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-all">
                Đăng nhập ngay
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

export default RegisterForm;
