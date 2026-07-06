import api from './api';

export const authService = {
    // Gọi API Đăng nhập
    login: async (data: any) => {
        // Backend đang yêu cầu email, form truyền lên username.
        // Tạm thời mapping sang email để test hoặc chờ Backend đổi
        const payload = {
            email: data.username, // mapping username từ form sang email cho API
            password: data.password
        };
        const response = await api.post('/auth/login', payload);
        return response.data;
    },

    // Gọi API Đăng ký
    register: async (data: any) => {
        // Loại bỏ confirmPassword trước khi gửi lên Backend
        const { confirmPassword, dob, ...rest } = data;
        const payload = {
            ...rest,
            age: dob // mapping dob sang age cho API Backend hiện tại
        };
        const response = await api.post('/auth/register', payload);
        return response.data;
    }
};
