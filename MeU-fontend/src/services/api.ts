import axios from 'axios';

// Khởi tạo một instance của axios
const api = axios.create({
    baseURL: 'http://localhost:8000', // Sửa URL này khi Backend deploy lên thật
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để tự động gắn Token vào mỗi request nếu có
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
