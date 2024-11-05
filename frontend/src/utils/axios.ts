import axios from 'axios';
import ApiLoginResponse from 'features/authentication/types/ApiLoginResponse';
import LoginForm from 'features/authentication/types/LoginForm';
import ApiArticle from 'types/ApiArticle';
import ApiPaginatedRequestParams from 'types/ApiPaginatedRequestParams';
import ApiPaginatedResponse from 'types/ApiPaginatedResponse';
import ApiUser from 'types/ApiUser';
import Comment from 'types/Comment';
import CreateArticleFormData from 'types/CreateArticvleFormData';

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

export const getArticles = async () => {
  const defaultParams: ApiPaginatedRequestParams = {
    page: 1,
    perPage: 20
  };
  const response = await axiosInstance<ApiPaginatedResponse<ApiArticle>>({
    method: 'GET',
    url: '/api/articles',
    params: defaultParams
  });

  return response.data;
};

export const createArticle = async (data: CreateArticleFormData) => {
  const response = await axiosInstance<CreateArticleFormData>({
    method: 'POST',
    url: '/api/articles',
    data
  });

  return response.data;
};
