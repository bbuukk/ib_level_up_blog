import axios from 'axios';
import ApiLoginResponse from 'features/authentication/types/ApiLoginResponse';
import LoginForm from 'features/authentication/types/LoginForm';
import ApiUser from 'types/ApiUser';
import Comment from 'types/Comment';

export const axiosBaseConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const axiosInstance = axios.create(axiosBaseConfig);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (data: LoginForm) => {
  const response = await axiosInstance<ApiLoginResponse>({
    method: 'POST',
    url: '/api/login',
    data
  });

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance<ApiUser>({
    method: 'GET',
    url: '/api/me'
  });

  return response.data;
};

export const storeComment = async (
  articleId: number,
  comment: string
): Promise<Comment> => {
  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles/${articleId}/comments`,
    data: {
      content: comment
    }
  });

  return response.data;
};
