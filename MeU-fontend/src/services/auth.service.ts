import api from './api';

// ==================== Types ====================
export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  address: string;
}

export interface UserInfo {
  id: string;
  name: string;
  username: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  access_token?: string;
  user: UserInfo;
}

// ==================== Service ====================
export const authService = {
  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', {
      username: data.username.trim(),
      password: data.password,
    });
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', {
      name: data.name.trim(),
      username: data.username.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      dob: data.dob,
      gender: data.gender,
      address: data.address.trim(),
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
  },

  saveSession: (authData: AuthResponse) => {
    if (authData.access_token) {
      localStorage.setItem('access_token', authData.access_token);
    }
    localStorage.setItem('user_info', JSON.stringify(authData.user));
  },

  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
};
