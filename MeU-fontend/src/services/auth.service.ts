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
        // Loại bỏ confirmPassword để không bị lỗi forbidNonWhitelisted ở Backend
        const { confirmPassword, ...payload } = data;
        const response = await api.post('/auth/register', payload);
        return response.data;
    }
};
