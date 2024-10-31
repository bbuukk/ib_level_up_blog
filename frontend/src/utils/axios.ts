import axios from 'axios';
import ApiLoginResponse from 'features/authentication/types/ApiLoginResponse';
import LoginForm from 'features/authentication/types/LoginForm';

export const axiosBaseConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const axiosInstance = axios.create(axiosBaseConfig);

export const login = async (data: LoginForm) => {
  const response = await axiosInstance<ApiLoginResponse>({
    method: 'POST',
    url: '/api/login',
    data
  });

  return response.data;
};
