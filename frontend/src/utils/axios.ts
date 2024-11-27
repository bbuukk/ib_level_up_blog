import axios from 'axios';

import CreateCommentFormData from 'types/CreateCommentFormData';
import ApiPaginatedRequestParams from 'types/ApiPaginatedRequestParams';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import ApiUpdateUserRequestParams from 'types/ApiUpdateUserRequestParams';
import ApiArticleRequestParams from 'types/ApiArticleRequestParams';

import ApiLoginResponse from 'features/authentication/types/ApiLoginResponse';
import LoginForm from 'features/authentication/types/LoginForm';
import ApiArticle from 'types/ApiArticle';
import ApiPaginatedResponse from 'types/ApiPaginatedResponse';
import ApiUser from 'types/ApiUser';
import { PAGE_SIZE } from './constants';
import { transformObjectToFormData } from './transformObjectToFormData';
import ApiTag from 'types/ApiTag';
import ApiComment from 'types/ApiComment';
import RegisterForm from 'features/authentication/types/RegisterForm';
import ApiRegisterResponse from 'features/authentication/types/ApiRegisterResponse';

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

export const register = async (data: RegisterForm) => {
  const response = await axiosInstance<ApiRegisterResponse>({
    method: 'POST',
    url: '/api/users',
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

export const storeComment = async ({
  articleId,
  commentContent
}: CreateCommentFormData): Promise<ApiComment> => {
  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles/${articleId}/comments`,
    data: {
      content: commentContent
    }
  });

  return response.data;
};

export const getArticles = async (
  params: ApiArticlesIndexRequestParams
): Promise<ApiPaginatedResponse<ApiArticle>> => {
  const response = await axiosInstance<ApiPaginatedResponse<ApiArticle>>({
    method: 'GET',
    url: '/api/articles',
    params: {
      ...params,
      perPage: PAGE_SIZE
    }
  });

  return response.data;
};

export const updateUser = async (params: ApiUpdateUserRequestParams) => {
  const formData = transformObjectToFormData(params);

  formData.append('_method', 'put');

  const response = await axiosInstance({
    method: 'POST',
    url: `/api/users/${params.id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axiosInstance({
    method: 'DELETE',
    url: `/api/users/${userId}`
  });

  return response.data;
};

type ApiArticleRequestParamsWithoutId = Omit<ApiArticleRequestParams, 'id'>;

//TODO: use CreateArticleFormData
export const storeArticle = async (
  params: ApiArticleRequestParamsWithoutId
) => {
  const formData = transformObjectToFormData(params);

  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  console.log(response.data);

  return response.data;
};

export const updateArticle = async (params: ApiArticleRequestParams) => {
  const formData = transformObjectToFormData(params);

  formData.append('_method', 'put');

  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles/${params.id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const deleteArticle = async (articleId: number) => {
  const response = await axiosInstance({
    method: 'DELETE',
    url: `/api/articles/${articleId}`
  });

  return response.data;
};

export const getArticleById = async (articleId?: number) => {
  if (!articleId) {
    return null;
  }

  const response = await axiosInstance<ApiArticle>({
    method: 'GET',
    url: `/api/articles/${articleId}`
  });

  return response.data;
};

export const getArticleComments = async (
  articleId: number,
  params: ApiPaginatedRequestParams
) => {
  const response = await axiosInstance<ApiPaginatedResponse<ApiComment>>({
    method: 'GET',
    url: `/api/articles/${articleId}/comments`,
    params: {
      ...params,
      perPage: PAGE_SIZE
    }
  });

  return response.data;
};

export const getTags = async (params: ApiPaginatedRequestParams) => {
  const response = await axiosInstance<ApiPaginatedResponse<ApiTag>>({
    method: 'GET',
    url: '/api/tags',
    params: {
      ...params,
      perPage: PAGE_SIZE
    }
  });

  return response.data;
};
