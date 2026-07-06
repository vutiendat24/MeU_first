import api from './api';

export const authService = {
    // Gọi API Đăng nhập
    login: async (data: any) => {
        const payload = {
            username: data.username,
            password: data.password
        };
        const response = await api.post('/auth/login', payload);
        return response.data;
    },

    // Gọi API Đăng ký
    register: async (data: any) => {
<<<<<<< HEAD
        // Loại bỏ confirmPassword để không bị lỗi forbidNonWhitelisted ở Backend
=======
        // Loại bỏ confirmPassword trước khi gửi lên Backend
>>>>>>> 78bfc7099711db40c970089f6ccbe5a286106286
        const { confirmPassword, ...payload } = data;
        const response = await api.post('/auth/register', payload);
        return response.data;
    }
};
